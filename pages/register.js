import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import InfoView from "../@crema/core/InfoView";
import { Form, Formik, useField } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { onJwtUserSignUp } from "../redux/actions";
import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";
import IntlMessages from "../@crema/utility/IntlMessages";
import image from "assets/img/bg7.jpg";
import { LabelImportantTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(styles);

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], <IntlMessages id='Passwords Must Match' />)
    .required(<IntlMessages id='validation.reTypePassword' />)
});

export default function RegisterPage(props) {
  const dispatch = useDispatch();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
              <Formik
          validateOnChange={true}
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setErrors, setSubmitting }) => {
            if (data.password !== data.confirmPassword) {
              setErrors({
                confirmPassword: (
                  <IntlMessages id='passwordMisMatch' />
                )
              });
            } else {
              setSubmitting(true);
              dispatch(
                onJwtUserSignUp({
                  email: data.email,
                  password: data.password,
                  name: data.name
                })
              );
              setSubmitting(false);
            }
          }}>
                  {({ isSubmitting }) => (<Form className={classes.form} noValidate autoComplete='off'>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>



                  <CardBody>

                    <MyTextField
                      label={<IntlMessages id='common.name' />}
                      labelText="Name"
                    name='name'
                    className={classes.myTextFieldRoot}
                      formControlProps={{
                        fullWidth: true
                      }}
                      InputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <MyTextField
                    label={<IntlMessages id='common.email' />}
                      labelText="Email"
                      name="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      InputProps={{
                        type: "email",
                        classes: {
                          //root: classes.labelRoot,
                          //underline: classes.underline,
                          //disabled: classes.disabled,
                          //underlineSuccess: classes.//underlineSuccess,
                          //fullWidth: true,
                          //whiteUnderline: classes.whiteUnderline,
                          //rootError: classes.labelRootError,
                          //rootSuccess: classes.labelRootSuccess,
                          //formControl: classes.formControl,
                          //input: classes.input,
                          //whiteInput: classes.whiteInput
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <MyTextField
                      label={<IntlMessages id='common.password' />}
                      labelText="Password"
                      name="password"
                      className={classes.myTextFieldRoot}
                      formControlProps={{
                        fullWidth: true
                      }}
                      InputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <MyTextField
                    label={<IntlMessages id='common.retypePassword' />}
                      labelText="Confirm Password"
                      name="confirmPassword"
                      className={classes.myTextFieldRoot}
                      formControlProps={{
                        fullWidth: true
                      }}
                      InputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple color="primary"
                      disabled={isSubmitting}
                      size="lg"
                      type='submit'>
                      Create Account
                    </Button>
                  </CardFooter>
                </Form>
                  )}
                </Formik>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <InfoView />
        <Footer whiteFont />
      </div>
    </div>
  );
}
