"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "react-redux";
import store from "./context/store";
import UseUserPreferance from "./context/useSelectBooks/usePreferance";
import UseCategoryProvider from "./context/useSelectBooks/useCategory";
import UseRecomendationProvider from "./context/useSelectBooks/useRecomended";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <UseUserPreferance>
            <UseCategoryProvider>
              <UseRecomendationProvider>{children}</UseRecomendationProvider>
            </UseCategoryProvider>
          </UseUserPreferance>
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}
