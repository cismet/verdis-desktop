import { Link } from "react-router-dom";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [
    {
      kassenzeichen: 68119510,
      bez: "1",
    },
    {
      kassenzeichen: 60055167,
      bez: "A",
    },
    {
      kassenzeichen: 62803044,
      bez: "3",
    },
  ];
};

const CrossReferences = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <CustomCard style={{ ...style, width, height }} title="Querverweise">
      <div className="flex flex-col gap-1 items-center justify-center text-sm">
        {data.map((row, i) => (
          <Link
            key={`crossReferences_${i}`}
            className="flex w-full justify-center items-center py-1 hover:bg-zinc-100 cursor-pointer"
            to={`/versiegelteFlaechen?kassenzeichen=${row.kassenzeichen}&bez=${row.bez}`}
          >
            <span className="text-black">
              {row.kassenzeichen}:{row.bez}
            </span>
          </Link>
        ))}
      </div>
    </CustomCard>
  );
};

export default CrossReferences;
