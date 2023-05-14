export default async function createUser(newUser) {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || 'Something went wrong!');

    return result;
  } catch (err) {
    throw new Error(err.message || 'Something went wrong!');
  }
}
