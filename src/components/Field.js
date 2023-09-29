import { Checkbox, Switch } from "antd";
function Field(props) {
  function Internal() {
    return (
      <div className="card-form-flex-child">
        <Checkbox
          name="phone"
          checked={entity.internalUse ? entity.internalUse : entity.mandatory}
          onChange={handleInternalChange}
        >
          &nbsp;{internalKey}
        </Checkbox>
      </div>
    );
  }
  function Hide() {
    return (
      <div className="card-form-flex-child">
        <Switch
          onChange={handleHideChange}
          checked={!entity.show}
          size="small"
        />
        &nbsp;{entity.show ? hideKey : showKey}
      </div>
    );
  }
  const {
    entity,
    handleHideChange,
    handleInternalChange,
    placeholder,
    internalKey,
    hideKey,
    showKey,
  } = props;
  return (
    <div className="card-form-field">
      <div className="card-form-flex-child" style={{ width: "300px" }}>
        {placeholder}
      </div>
      <Internal />
      <Hide />
    </div>
  );
}

export default Field;
