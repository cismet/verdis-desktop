/** @type { import('@storybook/react').Preview } */
import { ConfigProvider } from "antd";
import locale from "antd/locale/de_DE";
import "tailwindcss/tailwind.css";
import "../src/index.css";
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "CommonComponents",
          "App",
          "Overview",
          ["Page", "Components"],
          "SealedSurfaces",
          ["Page", "DetailsPage", "Components"],
          "StreetCleaning",
          ["Page", "DetailsPage", "Components"],
          "Info",
          ["Page", "Components"],
          "SeepagePermits",
          ["Page", "DetailsPage", "Components"],
          "Settings",
          ["Page", "Components"],
          "Chat",
          ["Page", "Components"],
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#E67843",
          },
        }}
        locale={locale}
      >
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default preview;
