import '@testing-library/jest-dom'

// jsdom lacks scroll APIs used by App's ScrollManager
window.scrollTo = () => {}
Element.prototype.scrollIntoView = () => {}
