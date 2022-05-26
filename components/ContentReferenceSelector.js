const ContentReferenceSelector = ({ referenceNames, handleChange, value }) => {
  // set up referenceNameData
  let referenceNameData;

  // if we have value, parse it
  if (value) {
    referenceNameData = JSON.parse(value).settings.referenceName;
  }

  return (
    <select
      name="referenceName"
      onChange={(e) => handleChange(e)}
      value={referenceNameData ? referenceNameData : ""}
    >
      <option>Select a value...</option>
      {referenceNames.map((referenceName, index) => {
        return (
          <option value={referenceName} key={index}>
            {referenceName}
          </option>
        );
      })}
    </select>
  );
};

export default ContentReferenceSelector;
