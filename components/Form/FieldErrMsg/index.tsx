function FieldErrMsg({ msg }: Readonly<{ msg: string }>) {
   return (
      <small id="username2-help" className="p-error">
         {msg}
      </small>
   )
}

export default FieldErrMsg
