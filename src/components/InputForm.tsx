import React, { Dispatch } from 'react'
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputAndroidProps, View } from 'react-native'
import { COLORS } from '../utils/constants'

interface Props {
  label: string
  placeholder: string
  disabledInput?: boolean
  limitCaracteres?: number
  errorMessage: string
  valueInput: string
  validateInput: boolean
  keyboardType?: KeyboardTypeOptions
  setValueInput: Dispatch<React.SetStateAction<string>>
  setValidateInput: Dispatch<React.SetStateAction<boolean>>
  functionValidation: (text: string) => boolean
}

const InputForm = ({
  label,
  placeholder,
  valueInput,
  setValueInput,
  validateInput,
  setValidateInput,
  functionValidation,
  disabledInput,
  limitCaracteres,
  errorMessage,
  keyboardType
}: Props) => {
  const validateFunction = (e: string) => {
    if (functionValidation(e)) {
      setValidateInput(true)
    } else {
      setValidateInput(false)
    }
    setValueInput(e)
  }
  return (
    <View style={ styles.container }>
      <Text style={ styles.txtlabel }>{ label }</Text>
      <View style={ styles.inputContainer }>
        <TextInput
          placeholder={ placeholder }
          value={ valueInput }
          editable={ disabledInput }
          keyboardType={ keyboardType }
          maxLength={ limitCaracteres }
          style={ styles.inputWidth }
          onChangeText={ e => validateFunction(e) }
        />
      </View>
      { valueInput.length === 0
        ? null
        : !validateInput
            ? (<Text>{ errorMessage }</Text>)
            : null }

    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
    // backgroundColor: 'red'
  },
  txtlabel: {
    fontSize: 15
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
    height: 50,
    borderWidth: 1.2,
    borderRadius: 15,
    borderColor: COLORS.PRIMARY
  },
  inputWidth: {
    width: '90%',
    fontSize: 15
    // backgroundColor: 'red'

  }
})
