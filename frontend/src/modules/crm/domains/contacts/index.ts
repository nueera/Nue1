export * from './types';
export * from './constants';
export { contactKeys } from './query-keys';
export { contactService } from './service';
export { getContactDisplayName } from './utils';
export { createContactSchema, updateContactSchema, contactMergeSchema, contactMassUpdateSchema } from './schema';
export type { CreateContactInput, ContactMergeInput } from './schema';
export { useContacts, useContact, useCreateContact, useUpdateContact, useDeleteContact, useMergeContacts, useContactHierarchy, useContactDuplicates, useMassUpdateContacts } from './hook';
export * from './components';