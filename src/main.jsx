import { Button, ConfigProvider, Result } from "antd";
import "antd/dist/reset.css";
import locale from "antd/locale/de_DE";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter,
  useLocation,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "./components/commons/NavBar";
import "./index.css";
import InfoPage from "./pages/Info";
import LoginPage from "./pages/Login";
import OverviewPage from "./pages/Overview";
import SealedSurfaceOverviewPage from "./pages/SealedSurfaces";
import SealedSurfaceDetailsPage from "./pages/SealedSurfacesDetails";
import SeepagePermitsPage from "./pages/SeepagePermits";
import SeepagePermitsDetailsPage from "./pages/SeepagePermitsDetails";
import StreetCleaningPage from "./pages/StreetCleaning";
import StreetCleaningDetailsPage from "./pages/StreetCleaningDetails";
import store from "./store";
import { checkJWTValidation, getJWT } from "./store/slices/auth";
import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import {
  backgroundConfigurations,
  backgroundModes,
  extendBaseLayerConf,
  offlineConfig,
} from "./constants/backgrounds";
import { defaultLayerConf } from "react-cismap/tools/layerFactory";
import { getReadOnly, getShowChat } from "./store/slices/settings";
import Chat from "./components/commons/Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistStore } from "redux-persist";

const baseLayerConf = extendBaseLayerConf({ ...defaultLayerConf });

const persistor = persistStore(store);

const NavBarWrapper = () => {
  const jwt = useSelector(getJWT);
  const readOnly = useSelector(getReadOnly);
  const location = useLocation();
  const showChat = useSelector(getShowChat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkJWTValidation());
  }, []);

  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-screen w-full">
      <NavBar />
      <ConfigProvider componentDisabled={readOnly}>
        <Outlet />
        {showChat ? <Chat /> : <></>}
      </ConfigProvider>
    </div>
  );
};
const productionMode = process.env.NODE_ENV === "production";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <NavBarWrapper />,
      errorElement: productionMode && (
        <Result
          status="404"
          title="404"
          subTitle="Die Seite wurde nicht gefunden"
          extra={
            <Button type="primary" href="/">
              Zurück
            </Button>
          }
        />
      ),
      children: [
        {
          path: "/",
          element: <OverviewPage />,
        },
        {
          path: "/versiegelteFlaechen",
          element: <SealedSurfaceOverviewPage />,
        },
        {
          path: "/versiegelteFlaechen/details",
          element: <SealedSurfaceDetailsPage />,
        },
        {
          path: "/strassenreinigung",
          element: <StreetCleaningPage />,
        },
        {
          path: "/strassenreinigung/details",
          element: <StreetCleaningDetailsPage />,
        },
        {
          path: "/info",
          element: <InfoPage />,
        },
        {
          path: "/versickerungsgenehmigungen",
          element: <SeepagePermitsPage />,
        },
        {
          path: "/versickerungsgenehmigungen/details",
          element: <SeepagePermitsDetailsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ],
  {}
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E67843",
        },
      }}
      locale={locale}
    >
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <TopicMapContextProvider
              appKey="verdis-desktop.map"
              backgroundModes={backgroundModes}
              backgroundConfigurations={backgroundConfigurations}
              baseLayerConf={baseLayerConf}
              offlineCacheConfig={offlineConfig}
            >
              <RouterProvider router={router} />
            </TopicMapContextProvider>
          </Provider>
        </QueryClientProvider>
      </PersistGate>
    </ConfigProvider>
  </React.StrictMode>
);
