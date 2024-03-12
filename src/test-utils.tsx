import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
              gcTime: 0,
            },
          },
        })
      }
    >
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) =>
  render(ui, {
    wrapper: Providers,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
