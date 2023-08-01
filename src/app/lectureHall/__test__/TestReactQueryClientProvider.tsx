import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { useState } from "react";

// 테스트 코드 작성용으로 queryclient 넘겨줄것
const TestReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryclient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
};

export default TestReactQueryClientProvider;
