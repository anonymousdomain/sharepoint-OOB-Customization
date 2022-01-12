import {
  ActionButton,
  DefaultButton,
  mergeStyles,
  Panel,
  PrimaryButton,
  Stack,
  TextField,
} from "office-ui-fabric-react";
import * as React from "react";
import { useState } from "react";
import { IAddLinkProps } from "./IAddLinkProps";
import { ILinkItemProps } from "./ILinkItemProps";

const AddLinkPanel = (props: IAddLinkProps) => {
  let _form:ILinkItemProps={title: "",url: "",description: ""}
  let [isOpen, setIsOpen] = useState(false);
  let [form, setForm] = useState(_form);

  let _container = mergeStyles({});
  let _btnCont = mergeStyles({
    paddingTop: 20,
  });
  const _onSubmit = () => {
    setIsOpen(false);
    props.handleAddLink(form);
  };
  return (
    <div className={_container}>
      <ActionButton
        iconProps={{ iconName: "Add" }}
        text={props.buttonTitle}
        onClick={() => setIsOpen(true)}
      />
      <Panel
        isOpen={isOpen}
        headerText="Add quick link"
        onDismiss={() => setIsOpen(false)}
      >
        <Stack tokens={{ childrenGap: 25 }}>
          <TextField
            onChange={(e) =>setForm({ ...form, title: (e.target as HTMLInputElement).value})}
            label="Title"
          />
          <TextField
            onChange={(e) =>setForm({ ...form, url: (e.target as HTMLTextAreaElement).value})}multiline
            rowSpan={2}
            label="Url"
          />
          <TextField
            onChange={(e) =>setForm({ ...form,description: (e.target as HTMLTextAreaElement).value})}
            multiline
            rows={3}
            label="Description"
          />
        </Stack>
        <Stack
          horizontal
          className={_btnCont}
          horizontalAlign="start"
          tokens={{ childrenGap: 10 }}
        >
          <PrimaryButton text="Save" onClick={() => _onSubmit()} />
          <DefaultButton text="cancel" onClick={() => setIsOpen(false)} />
        </Stack>
      </Panel>
    </div>
  );
};

export default AddLinkPanel;
