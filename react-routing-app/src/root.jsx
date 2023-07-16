import { Form, Outlet, useLoaderData, redirect, Link } from 'react-router-dom';
import { createContact, getContact, getContacts } from './contacts';

export function Root() {
  const contacts = useLoaderData();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            {contacts.map((contact) => {
              return (
                <li>
                  <Link to={'/contact/' + contact.id}> {contact.id}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export async function rootLoader() {
  let contacts = await getContacts();
  return contacts;
}

export async function rootAction() {
  // Step 1: Create a new contact
  let contact = await createContact();

  // Step 2: Navigate to Edit Contact Page
  return redirect('contact/' + contact.id + '/edit');
}

export async function contactLoader({ params }) {
  console.log('ContactId=>>>>', params.contactId);
  let contact = await getContact(params.contactId);
  return contact;
}

export async function contactEditAction({ params }) {
  console.log(params.contactId);
}
