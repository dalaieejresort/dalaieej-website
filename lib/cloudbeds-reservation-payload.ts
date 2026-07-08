import { normalizeCloudbedsRoomTypeID } from "./cloudbeds";

export type CloudbedsRoomReservationLine = {
  roomTypeID: string;
  roomRateID: string;
  adults: number;
  children: number;
};

export type CloudbedsReservationRoomPayload = {
  roomTypeID: string;
  roomRateID: string;
  quantity: number;
};

export type CloudbedsReservationOccupancyPayload = {
  roomTypeID: string;
  quantity: number;
};

export function groupReservationLinesForCloudbeds(lines: CloudbedsRoomReservationLine[]): {
  rooms: CloudbedsReservationRoomPayload[];
  adults: CloudbedsReservationOccupancyPayload[];
  children: CloudbedsReservationOccupancyPayload[];
} {
  const roomGroups = new Map<
    string,
    CloudbedsReservationRoomPayload & { adults: number; children: number }
  >();
  const occupancyGroups = new Map<
    string,
    CloudbedsReservationOccupancyPayload & { children: number }
  >();

  for (const line of lines) {
    const roomTypeID = normalizeCloudbedsRoomTypeID(line.roomTypeID);
    const roomKey = `${roomTypeID}__${String(line.roomRateID)}`;
    const roomGroup = roomGroups.get(roomKey);

    if (roomGroup) {
      roomGroup.quantity += 1;
      roomGroup.adults += line.adults;
      roomGroup.children += line.children;
    } else {
      roomGroups.set(roomKey, {
        roomTypeID,
        roomRateID: line.roomRateID,
        quantity: 1,
        adults: line.adults,
        children: line.children,
      });
    }

    const occupancyGroup = occupancyGroups.get(roomTypeID);
    if (occupancyGroup) {
      occupancyGroup.quantity += line.adults;
      occupancyGroup.children += line.children;
    } else {
      occupancyGroups.set(roomTypeID, {
        roomTypeID,
        quantity: line.adults,
        children: line.children,
      });
    }
  }

  const rooms = Array.from(roomGroups.values()).map(
    ({ roomTypeID, roomRateID, quantity }) => ({
      roomTypeID,
      roomRateID,
      quantity,
    })
  );
  const occupancy = Array.from(occupancyGroups.values());

  return {
    rooms,
    adults: occupancy.map(({ roomTypeID, quantity }) => ({
      roomTypeID,
      quantity,
    })),
    children: occupancy.map(({ roomTypeID, children }) => ({
      roomTypeID,
      quantity: children,
    })),
  };
}
