import { Checkbox, DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getKassenzeichen } from "../../store/slices/search";
import TextArea from "antd/es/input/TextArea";

const GeneralRow = ({ title, placeholder, width, customInput, value }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm w-1/2">{title}:</div>
      {customInput ? (
        customInput
      ) : (
        <Input
          className={`${width > 365 ? "w-full" : "w-1/2"}`}
          placeholder={placeholder}
          value={value}
        />
      )}
    </div>
  );
};

const mockExtractor = (input) => {
  const dateFormat = "DD.MM.YYYY";
  const bemerkungsObject = input?.kassenzeichen[0]?.bemerkung;
  let formattedBemerkungen;
  if (bemerkungsObject) {
    const bemerkungen = JSON.parse(bemerkungsObject).bemerkungen.map(
      (bemerkung) => bemerkung.bemerkung
    );
    formattedBemerkungen = bemerkungen.join("\n");
  }
  return {
    date: input?.kassenzeichen[0]?.datum_erfassung
      ? dayjs(
          dayjs(input?.kassenzeichen[0]?.datum_erfassung).format(dateFormat),
          dateFormat
        )
      : null,
    bemerkung: formattedBemerkungen,
    sperre: input?.kassenzeichen[0]?.sperre,
    aenderungsAnfrage:
      input?.aenderungsanfrage[0]?.aenderungsanfrage_status?.name,
    kassenzeichenNummer: input?.kassenzeichen[0]?.kassenzeichennummer8,
  };
};

const General = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);
  const dateFormat = "DD.MM.YYYY";

  return (
    <CustomCard style={{ ...style, width, height }} title="Allgemein">
      <div className="flex flex-col gap-2">
        <GeneralRow
          title="Kassenzeichen"
          placeholder="123456790"
          width={width}
          value={data.kassenzeichenNummer}
        />
        <GeneralRow
          title="Datum der Erfassung"
          customInput={
            <DatePicker
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
              placeholder="02.03.2023"
              format={dateFormat}
              value={data.date}
            />
          }
          width={width}
        />
        <GeneralRow
          title="Bemerkung"
          width={width}
          customInput={
            <TextArea
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
              value={data.bemerkung}
            />
          }
        />
        <GeneralRow
          title="Veranlagung gesperrt"
          customInput={<Checkbox value={data.sperre} />}
          width={width}
        />
        <GeneralRow
          title="Änderungsanfrage"
          customInput={
            <Select
              placeholder="In Bearbeitung"
              options={[
                { value: "in Bearbeitung", label: "In Bearbeitung" },
                { value: "erledigt", label: "Erledigt" },
                { value: "geschlossen", label: "Geschlossen" },
                { value: "ausstehend", label: "Ausstehend" },
                { value: "archiviert", label: "Archiviert" },
                { value: "_neue Nachricht", label: "Neue Nachricht" },
              ]}
              showArrow={false}
              value={data.aenderungsAnfrage}
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
            />
          }
          width={width}
        />
      </div>
    </CustomCard>
  );
};

export default General;
