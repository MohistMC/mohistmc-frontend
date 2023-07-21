export const hackNextra = () => {
    try {
        const searchBar = document.getElementsByClassName('nextra-search')[0]
        const searchBarParent = searchBar?.parentElement

        const hamburgerMenu = document.getElementsByClassName('nextra-hamburger')[0]
        const paragraphElement = document.createElement('p')
        paragraphElement.classList.add('mr-3')
        paragraphElement.innerHTML = 'Docs menu'

        // Check it doesn't already contain any paragraph element (by default it contains one svg)
        if (hamburgerMenu?.children.length === 1)
            hamburgerMenu?.insertAdjacentElement('afterbegin', paragraphElement)

        const removeNavBarElements = () => {
            for (const element of searchBarParent?.children || []) {
                if (!element.classList.contains('nextra-search') && !element.classList.contains('nextra-hamburger'))
                    element.remove()
            }
        }
        // Remove the navbar elements except the searchbar and burger menu
        removeNavBarElements()
    } catch (e) {
        // Do nothing
    }
}