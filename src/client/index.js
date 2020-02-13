import { handleSubmit } from './js/formHandler'
import { handleClear } from './js/formReset'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/result.scss'

document.addEventListener('DOMContentLoaded ', () => {
  //event listeners here
  const resetButton = document.getElementById('remove');
  resetButton.addEventListener('click', handleClear);
});

export {
  handleSubmit,
  handleClear,
}
