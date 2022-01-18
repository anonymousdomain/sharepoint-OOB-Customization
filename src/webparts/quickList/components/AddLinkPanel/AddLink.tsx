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
import { Form, Formik, Field, FormikProps } from 'formik';
import * as yup from 'yup'
import { values } from "lodash";
const AddLinkPanel = (props: IAddLinkProps) => {
  let _form:ILinkItemProps={title: "",url: "",description: ""}
  let [isOpen, setIsOpen] = useState(false);
  let [form, setForm] = useState(_form);

  let _container = mergeStyles({});
  let _btnCont = mergeStyles({
    paddingTop: 20,
  });
  
  //handle submit 
  const _onSubmit = () => {
    setIsOpen(false);
    props.handleAddLink(form);
  };
  const getFieldProps = (formik: FormikProps<any>, field: string) => {
    return { ...formik.getFieldProps(field), errorMessage: formik.errors[field] as string }
  }
//validate 
  const validate = yup.object().shape({
    title: yup.string().required('Your title is Required'),
    description: yup.string()
      .min(15, 'Minimum required 15 characters')
      .required('please provide description'),
    url: yup.string().required('Url Link is required'),
   
  })
  if(props.hidden){
    return (<></>)
  }else
  return (

    <Formik
      initialValues={{
        title:'',
        url:'',
        description:''
      }}
      validationSchema={validate}
      onSubmit={(values,helpers)=>{
      props.handleAddLink(values).then(res=>{
        helpers.resetForm()
      });
      }} >
        {formik=>(
      <div className={_container}>
        <ActionButton
          iconProps={{ iconName: "Add" }}
          text={props.buttonTitle}
          onClick={() => setIsOpen(true)} />
        <Panel
          isOpen={isOpen}
          headerText="Add quick link"
          onDismiss={() => setIsOpen(false)}
        >
          <Stack tokens={{ childrenGap: 25 }}>
            <TextField
              // onChange={(e) => setForm({ ...form, title: (e.target as HTMLInputElement).value })}
             {...getFieldProps(formik,'title')}
             label="Title" />
            <TextField
              // onChange={(e) => setForm({ ...form, url: (e.target as HTMLTextAreaElement).value })} multiline
              {...getFieldProps(formik,'url')}
              rowSpan={2}
              label="Url" />
            <TextField
              // onChange={(e) => setForm({ ...form, description: (e.target as HTMLTextAreaElement).value })}
              {...getFieldProps(formik,'description')}
              multiline
              rows={3}
              label="Description" />
          </Stack>
          <Stack
            horizontal
            className={_btnCont}
            horizontalAlign="start"
            tokens={{ childrenGap: 10 }}
          >
            <PrimaryButton type="submit" text="Save" onClick={formik.handleSubmit as any} />
            <DefaultButton text="cancel" onClick={() => setIsOpen(false)} />
          </Stack>
        </Panel>
      </div>
      )
      }
  </Formik>
  );
};

export default AddLinkPanel;
