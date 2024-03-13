import postOrderSelection, {
  OrderRequest,
} from "@/services/data/postOrderSelection";
import { useMutation } from "@tanstack/react-query";

export default function usePostOrderRequest() {
  return useMutation({
    mutationKey: ["order-selection-request"],
    mutationFn: async (selectedOrder: OrderRequest) => {
      const { data } = await postOrderSelection(selectedOrder);
      return data;
    },
  });
}
