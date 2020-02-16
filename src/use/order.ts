import orderBy from "lodash/orderBy";
import { reactive, ref, computed, Ref } from "@vue/composition-api";
import { OrderOption } from "../types";

export default function useOrder<T>(input: Readonly<Ref<readonly T[]>>, options: OrderOption[], index: number) {
  const orderOptions = reactive<OrderOption[]>(options);

  const orderIndex = ref(index);

  // @ts-ignore
  const orderedResults = computed(() => orderBy(input.value, orderOptions[orderIndex.value].value, "desc"));

  return {
    orderOptions,
    orderIndex,
    orderedResults
  };
}
