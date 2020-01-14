export const handler = async (event: any = {}): Promise<any> => {
  // Log the event argument for debugging and for use in local development.
  //const response = JSON.stringify(event, undefined, 2);
  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: "It is cool"
  }
  console.log(response);

  return response;
}
