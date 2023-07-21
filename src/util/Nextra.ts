export const hackNextra = () => {
    const nextraNavContainer = document.getElementsByClassName('nextra-nav-container')[0]

    for (let i = 0; i < nextraNavContainer.classList.length; i++)
        if (nextraNavContainer.classList[i] !== 'nextra-nav-container')
            nextraNavContainer.classList.remove(nextraNavContainer.classList[i])

    const navBarBlur = document.getElementsByClassName('nextra-nav-container-blur')[0]
    navBarBlur?.remove()

    nextraNavContainer.classList.add(`mt-20`)
    nextraNavContainer.classList.add(`pt-20`)

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

    // Place searchbar on the left
    searchBarParent?.classList.remove('nx-justify-end')
    searchBarParent?.classList.add('nx-justify-start')

    // Remove theme switcher
    const asideElement = document.getElementsByTagName('aside')[0]
    for (const child of asideElement.children)
        if (child.classList.contains('nx-sticky'))
            child.remove()

    // Remove footer
    const divElement = document.querySelector('div[dir="ltr"]')
    const footerElement = divElement?.querySelector('footer')
    footerElement?.remove()
}