import { AutoComplete, Avatar, Button, Dropdown, Input, Switch } from "antd";
import Logo from "/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faX } from "@fortawesome/free-solid-svg-icons";
import {
  ClockCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  GatewayOutlined,
  GlobalOutlined,
  HomeOutlined,
  LinkOutlined,
  LoadingOutlined,
  PullRequestOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJWT, storeJWT, storeLogin } from "../../store/slices/auth";
import {
  addSearch,
  getPreviousSearches,
  removePreviousSearch,
  storeAenderungsAnfrage,
  storeKassenzeichen,
} from "../../store/slices/search";
import { getReadOnly, setReadOnly } from "../../store/slices/settings";
import { ENDPOINT, query } from "../../constants/verdis";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

const mockExtractor = (input) => {
  return [
    {
      title: "Übersicht",
      href: "/",
      icon: <HomeOutlined className="text-2xl" />,
    },
    {
      title: "Versiegelte Flächen",
      href: "/versiegelteFlaechen",
      icon: <GatewayOutlined className="text-2xl" />,
    },
    {
      title: "Straßenreinigung",
      href: "/strassenreinigung",
      icon: <PullRequestOutlined className="text-2xl" />,
    },
    {
      title: "Info",
      href: "/info",
      icon: <GlobalOutlined className="text-2xl" />,
    },
    {
      title: "Versickerungsgenehmigungen",
      href: "/versickerungsgenehmigungen",
      icon: <LinkOutlined className="text-2xl" />,
    },
  ];
};

const NavBar = ({
  dataIn,
  extractor = mockExtractor,
  width = "100%",
  height = 73,
  style,
  inStory,
}) => {
  const dispatch = useDispatch();
  const mockData = extractor(dataIn);
  const location = useLocation();
  const readOnly = useSelector(getReadOnly);
  const jwt = useSelector(getJWT);
  const prevSearches = useSelector(getPreviousSearches);
  const [inputValue, setInpuValue] = useState("");
  const [urlParams, setUrlParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    urlParams.get("kassenzeichen")
  );

  const items = [
    {
      label: <a href="/settings">Einstellungen</a>,
      key: "0",
    },
    {
      label: (
        <Switch
          onClick={() => dispatch(setReadOnly(!readOnly))}
          checked={!readOnly}
        />
      ),
      key: "1",
    },
    {
      label: <Button onClick={() => logout()}>Ausloggen</Button>,
      key: "2",
    },
  ];

  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const { data, isFetching, error } = useQuery({
    queryKey: ["kassenzeichen", searchQuery],
    queryFn: async () =>
      request(
        ENDPOINT,
        query,
        { kassenzeichen: searchQuery },
        {
          Authorization: `Bearer ${jwt}`,
        }
      ),
    enabled: !!searchQuery,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const logout = () => {
    dispatch(storeJWT(undefined));
    dispatch(storeLogin(undefined));
  };

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  useEffect(() => {
    if (data?.kassenzeichen?.length > 0) {
      const trimmedQuery = searchQuery.trim();
      dispatch(storeKassenzeichen(data.kassenzeichen[0]));
      dispatch(storeAenderungsAnfrage(data.aenderungsanfrage));
      setUrlParams({ kassenzeichen: trimmedQuery });
      dispatch(addSearch(trimmedQuery));
    }
  }, [data]);

  return (
    <header
      className="flex items-center justify-between bg-white p-2 gap-3"
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="md:flex hidden items-center gap-3">
        <img src={Logo} alt="Logo" className="h-10" />
        {mockData.map((link, i) => (
          <Link to={link.href + `?${urlParams}`} key={`navLink_${i}`}>
            <Button
              type="text"
              className={`${
                (location.pathname.includes(link.href) && i > 0) ||
                (link.href === "/" && location.pathname === "/")
                  ? "text-primary"
                  : ""
              } font-semibold no-underline`}
            >
              <div className="xl:hidden block">{link.icon}</div>
              <div className="hidden xl:block">{link.title}</div>
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex relative items-center gap-3 w-full">
        <AutoComplete
          options={prevSearches.map((kassenzeichen, i) => ({
            value: kassenzeichen,
            label: (
              <div className="flex gap-2 items-center group">
                <ClockCircleOutlined className="text-lg" />
                <span className="w-full">{kassenzeichen}</span>
                <FontAwesomeIcon
                  className="group-hover:visible invisible hover:bg-zinc-200 p-2"
                  icon={faX}
                  onClick={() => dispatch(removePreviousSearch(i))}
                />
              </div>
            ),
          }))}
          className="xl:w-1/2 w-full mx-auto"
          defaultValue={urlParams.get("kassenzeichen")}
          onSelect={(value) => setSearchQuery(value)}
          onChange={(value) => setInpuValue(value)}
        >
          <Input
            placeholder="Suche..."
            addonAfter={
              isFetching ? (
                <LoadingOutlined />
              ) : (
                <SearchOutlined onClick={() => setSearchQuery(inputValue)} />
              )
            }
            onPressEnter={(e) => setSearchQuery(inputValue)}
            status={data?.kassenzeichen?.length === 0 && "error"}
            name="kassenzeichen"
          />
        </AutoComplete>
      </div>
      <div className="flex items-center gap-3">
        <ExclamationCircleOutlined className="text-2xl cursor-pointer" />
        <QuestionCircleOutlined className="text-2xl cursor-pointer" />
        <CommentOutlined className="text-2xl cursor-pointer" />
        <Dropdown trigger={["click"]} menu={{ items }} placement="bottomRight">
          <Avatar
            size="large"
            icon={<FontAwesomeIcon icon={faUser} />}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
    </header>
  );
};

export default NavBar;
