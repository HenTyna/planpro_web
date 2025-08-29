import ReminderService from "@/service/reminder.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const useFetchReminder = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const searchParams = useSearchParams();
  const params = {
    page_number: pageNumber,
    page_size: pageSize,
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders", pageNumber, pageSize],
    queryFn: () => ReminderService.getReminders(params),
    retry: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error, setPageNumber, setPageSize };
};

export default useFetchReminder;
