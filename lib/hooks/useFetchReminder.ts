import ReminderService from "@/service/reminder.service";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useFetchReminder = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const params = {
    page_number: pageNumber,
    page_size: pageSize,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders", pageNumber, pageSize],
    queryFn: async () => {
      const response = await ReminderService.getReminders(params);
      return response.data;
    },
    retry: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading, error, setPageNumber, setPageSize };
};

export default useFetchReminder;
