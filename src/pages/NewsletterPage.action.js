export const action = async({ request }) => {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  return { message: 'Signup successful!' };
}
