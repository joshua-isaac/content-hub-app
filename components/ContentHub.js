import { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";

import ContentReferenceSelector from "./ContentReferenceSelector";
import EntireList from "./EntireList";

const ContentHub = () => {
  // set up states
  const [value, setValue] = useState("");
  const [fieldConfig, setFieldConfig] = useState(null);
  const [configValues, setConfigValues] = useState({});
  const [sdk, setSDK] = useState({});
  const [referenceName, setReferenceName] = useState(null);
  const [items, setItems] = useState([]);

  let referenceNameData;

  if (value) {
    referenceNameData = JSON.parse(value).settings.referenceName;
  }

  // set up reference names
  const referenceNames = configValues?.referenceNames?.split(",");

  // set ref
  const containerRef = useRef();

  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
    });
  }, []);

  // update value
  const updateValue = (e, items) => {
    // set up type variables
    let linkType;
    let referenceName;

    // set type based on target name
    switch (e?.target?.name) {
      case "referenceName":
        referenceName = e.target.value;
        break;
    }

    // structure data
    const data = {
      settings: {
        referenceName: referenceName || referenceNameData,
      },
      items,
    };

    // turn data into string so we can store in CMS
    const stingData = JSON.stringify(data);

    // set value
    setValue(stingData);

    // update fieldValue in cms
    sdk.updateFieldValue({ fieldValue: stingData });
  };

  // handle change
  const handleChange = (e) => {
    setReferenceName(e.target.value);
    updateValue(e);
  };

  if (fieldConfig) {
    return (
      <div className="field-row" ref={containerRef}>
        <label className="control-label">
          <span>{fieldConfig.label}</span>
          {fieldConfig.required && (
            <span className="required" title="This field is required.">
              *
            </span>
          )}
        </label>
        <div>
          <ContentReferenceSelector
            referenceNames={referenceNames}
            handleChange={handleChange}
            value={value}
          />
          <EntireList
            value={value}
            configValues={configValues}
            setItems={setItems}
            updateValue={updateValue}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="field-row" ref={containerRef}>
        <label>
          <span>Loading...</span>
        </label>
      </div>
    );
  }
};

export default ContentHub;
