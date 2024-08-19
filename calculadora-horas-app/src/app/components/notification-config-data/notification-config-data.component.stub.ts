import { ConfigAlerta } from "../../models/ConfigAlerta";

// definindo um stub <https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs>

export const mockAllAlerts = [
  {
    id: 1,
    workEntry: "10:00:00",
    intervalBeginning: "13:00:00",
    intervalEnd: "14:00:00",
    workEnd: "18:00:00",
    workload: 6,
    user_id: 1
  },
  {
    id: 2,
    workEntry: "07:00:00",
    intervalBeginning: "12:00:00",
    intervalEnd: "12:30:00",
    workEnd: "18:00:00",
    workload: 6,
    user_id: 2
  }
] as ConfigAlerta[]

export const mockOneAlert =
  {
    id: 1,
    workEntry: "07:00:00",
    intervalBeginning: "12:00:00",
    intervalEnd: "12:30:00",
    workEnd: "15:30:00",
    workload: 6,
    user_id: 2
  } as ConfigAlerta
