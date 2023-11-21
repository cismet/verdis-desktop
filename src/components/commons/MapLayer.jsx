import { useState } from "react";
import { FeatureCollectionDisplay } from "react-cismap";

const MapLayer = ({
  useHover,
  onHover,
  onOutsideHover,
  style,
  featureClickHandler,
  query,
  variables,
  endpoint,
  jwt,
  createFeature,
}) => {
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState();

  const myVirtHoverer = () => {
    const mouseoverHov = (feature) => {
      onHover(feature);
    };

    const mouseoutHov = () => {
      onOutsideHover();
    };

    return { mouseoverHov, mouseoutHov };
  };
  myVirtHoverer.virtual = true;

  const fetchFeatureCollection = () => {
    setLoading(true);
    fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setFeature(createFeature(result.data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw new Error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  fetchFeatureCollection();

  return (
    <FeatureCollectionDisplay
      featureCollection={feature}
      hoverer={useHover ? myVirtHoverer : null}
      style={style}
      featureClickHandler={featureClickHandler}
    />
  );
};

export default MapLayer;
