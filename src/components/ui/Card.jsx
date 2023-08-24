import { Card } from "antd";

const CustomCard = ({ style, title, children, fullHeight, ...props }) => {
  return (
    <Card
      style={style}
      bodyStyle={{
        overflowY: "auto",
        maxHeight: fullHeight ? "100%" : "calc(100% - 40px)",
        overflowX: "clip",
        height: "100%",
      }}
      title={<span className="text-lg">{title}</span>}
      size="small"
      hoverable={false}
      {...props}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
