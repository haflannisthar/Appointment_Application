export const LoginFormControls=[
    {
        label: 'Username',
        name:'username',
        placeholder:'Enter your username',
        type:'text',
        componentType:'input'
    },
    {
        label: 'Password',
        name:'password',
        placeholder:'Enter your password',
        type:'password',
        componentType:'input'
    }
]


export const RegisterFormControls = [
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your Email',
      type: 'email',
      componentType: 'input',
      validationPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
    },
    {
      label: 'Username',
      name: 'username',
      placeholder: 'Enter your username',
      type: 'text',
      componentType: 'input',
      validationPattern: /^[a-zA-Z0-9]{5,16}$/ // Example: 3-16 alphanumeric or underscores only
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
      type: 'password',
      componentType: 'input',
      validationPattern: /^[A-Za-z\d]{5,}$/
      // Example: Minimum 8 characters, at least one letter and one number
    }
  ];
  