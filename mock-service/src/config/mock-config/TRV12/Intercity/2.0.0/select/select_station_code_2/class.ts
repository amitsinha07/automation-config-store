import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import {
  MockAction,
  MockOutput,
  saveType,
} from "../../../../classes/mock-action";
import { SessionData } from "../../../../session-types";
import { selectGenerator } from "./generator";

export class MockSelectStationCode2Class extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8")
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./default.yaml"), "utf8")
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "select_default";
  }
  get description(): string {
    return "Mock for select_default";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return selectGenerator(existingPayload, sessionData);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    const userSelectedSeats = sessionData?.user_inputs?.items;
    const ticketCount = sessionData?.on_select_item?.quantity?.selected?.count;
    console.log(
      "sessionData?.user_inputs?.seat_count",
      sessionData?.user_inputs?.seat_count,
      ticketCount
    );
    if (userSelectedSeats?.length != ticketCount) {
      return {
        valid: false,
        message: `Number of selected seat numbers ${userSelectedSeats?.length} does not match the total selected seat count ${ticketCount}`,
      };
    }

    console.log(
      "sessionData.on_select_fulfillments",
      JSON.stringify(sessionData.on_select_fulfillments)
    );
    // console.log('sessionData.on_select_fulfillments_tags', sessionData.on_select_fulfillments_tags)

    const seatGridTags = (sessionData.on_select_fulfillments || [])
      .flatMap((fulfillmentArray: any[]) => fulfillmentArray) // flatten outer array
      .flatMap((fulfillment: any) => fulfillment?.tags || []) // extract tags
      .filter((tag: any) => tag?.descriptor?.code === "SEAT_GRID");
    console.log("seatGridTags", seatGridTags);
    const availableSeats = seatGridTags.flatMap((tag: any) =>
      (tag.list || [])
        .filter((item: any) => item?.descriptor?.code === "NUMBER")
        .map((item: any) => item.value)
    );

    console.log("availableSeats---", availableSeats);
    sessionData.seats_available = availableSeats;

    if (Array.isArray(userSelectedSeats) && userSelectedSeats.length > 0) {
      // Extract seatNumber from objects
      const selectedSeatNumbers = userSelectedSeats.map(
        (seat: any) => seat.seatNumber
      );

      // Check which of them are invalid
      const invalidSeats = selectedSeatNumbers.filter(
        (seatNumber: string) =>
          !sessionData.seats_available.includes(seatNumber)
      );

      console.log("invalidSeats:", invalidSeats);

      if (invalidSeats.length > 0) {
        return {
          valid: false,
          message: `Selected seats ${invalidSeats.join(
            ", "
          )} are not available. Available seats are: ${sessionData.seats_available.join(
            ", "
          )}`,
        };
      }
    }

    return { valid: true };
  }
}
