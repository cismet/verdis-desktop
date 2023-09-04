import React from "react";
import Map from "../components/commons/Map";
import Chat from "../components/commons/Chat";
import LegalNotice from "../components/streetCleaning/LegalNotice";
import Summary from "../components/overview/Summary";
import { frontsExtractor, summaryExtractor } from "../tools/extractors";
import TableCard from "../components/ui/TableCard";
import { compare } from "../tools/helper";
import SubNav from "../components/streetCleaning/SubNav";

const Page = ({
  width = "100%",
  height = "100%",
  inStory = false,
  showChat = false,
}) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }
  const cardStyleFronts = { width: "100%", height: "100%", minHeight: 0 };
  const cardStyleLegal = { width: "100%", height: "100%", minHeight: 0 };
  const cardStyleSummary = {
    width: "100%",
    height: "100%",
    minHeight: 0,
  };
  const mapHeight = height - 100;

  return (
    <div
      style={{ ...storyStyle, width, height }}
      className="flex flex-col items-center relative h-full max-h-[calc(100vh-73px)]"
    >
      <div className="flex flex-col gap-2 w-full bg-zinc-100 h-full overflow-clip p-2">
        <SubNav />
        <div className="flex gap-2 h-full max-h-[calc(100%-40px)]">
          <div className="flex flex-col gap-2 h-full w-[30%]">
            <TableCard
              width={cardStyleFronts.width}
              height={cardStyleFronts.height}
              style={cardStyleFronts}
              title="Fronten"
              columns={[
                {
                  title: "Nummer",
                  dataIndex: "nummer",
                  key: "nummer",
                  sorter: (a, b) => compare(a.nummer, b.nummer),
                },
                {
                  title: "Länge in m",
                  dataIndex: "laengeGrafik",
                  key: "laengeGrafik",
                  sorter: (a, b) => compare(a.laengeGrafik, b.laengeGrafik),
                },
                {
                  title: "Klasse",
                  dataIndex: "klasse",
                  key: "klasse",
                  sorter: (a, b) => compare(a.klasse, b.klasse),
                },
              ]}
              extractor={frontsExtractor}
            />
            <LegalNotice
              width={cardStyleLegal.width}
              height={cardStyleLegal.height}
              style={cardStyleLegal}
            />

            <Summary
              width={cardStyleSummary.width}
              height={cardStyleSummary.height}
              style={cardStyleSummary}
              extractor={summaryExtractor}
            />
          </div>
          <Map width={"80%"} height={"100%"} />
        </div>
      </div>
      {showChat && (
        <Chat
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 99999,
          }}
          height={height * 0.45}
          width={width * 0.2}
        />
      )}
    </div>
  );
};

export default Page;
