

// Create username ...
export const slugify = (name) => {
    let lowerName = name.toString().toLowerCase().replace(/\s+/g, ' ').trim()
    let slug = ""

    for (let i = 0; i < lowerName.length; i++) {
        let letter = lowerName[i];

        if (letter === ' ') {
            letter = '-'
        }

        slug += letter
    }

    return slug
}



