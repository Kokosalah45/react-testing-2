import { getOrderSelectionOptions } from "@/services/data/getOrderSelectionOptions";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrderSelectionOptions() {
  return useQuery({
    queryKey: ["order-selection-options"],
    queryFn: async () => {
      const { data } = await getOrderSelectionOptions();
      return data;
    },
  });
}
