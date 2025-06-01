export const handleInputChange = <T extends Record<string, any>>(
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  setErrors?: React.Dispatch<React.SetStateAction<Partial<T>>>, // Fix: Use Partial<T>
  validateField?: (name: string, value: string, form: T) => string
) => {
  const { name, value, type } = event.target;
  const checked =
    event.target instanceof HTMLInputElement ? event.target.checked : undefined;

  setForm((prevForm) => {
    const updatedForm = {
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    };

    if (validateField && setErrors) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value, updatedForm), // Now `setErrors` accepts optional fields
      }));
    }

    return updatedForm;
  });
};

export const handleInputBlur = <T extends Record<string, any>>(
  event: React.FocusEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setErrors: React.Dispatch<React.SetStateAction<Partial<T>>>,
  validateField: (name: string, value: string, form: T) => string,
  form: T
) => {
  const { name, value } = event.target;

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: validateField(name, value, form),
  }));
};
