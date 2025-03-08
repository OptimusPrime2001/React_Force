import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";
const service = new Service();
export const CheckLogin = async () => {
  try {
    const res = await service.get(
      ApiUrl.PlanningCrawlData
    );
    return res;
  } catch (err) {
    throw err;
  }
};

