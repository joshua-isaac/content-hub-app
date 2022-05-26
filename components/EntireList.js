import { useEffect, useState } from "react";
import agility from "@agility/content-fetch";

const EntireList = ({ value, configValues, updateValue, setItems }) => {
  const [listItems, setListItems] = useState([]);

  // set up reference name
  let referenceName;

  // if we have value, parse it
  if (value) {
    referenceName = JSON.parse(value).settings.referenceName;
  }

  useEffect(() => {
    (async () => {
      // set up agility api
      const api = agility.getApi({
        guid: configValues.guid,
        apiKey: configValues.apiKey,
      });

      // fetch list of items
      const { items } = await api.getContentList({
        referenceName: referenceName,
        locale: "en-us",
      });

      // set states and update value
      setItems(items);
      setListItems(items);
      updateValue(null, items);
    })();
  }, [referenceName]);
  return (
    <ul>
      {listItems &&
        listItems.map((item, index) => {
          return <li key={item.contentID}>{item?.fields?.title}</li>;
        })}
    </ul>
  );
};

export default EntireList;
