import { useRouter } from 'next/router'
import { capitalizeFirstLetter } from '@/util/String'
import {
    Button,
    FileInput,
    Flowbite,
    Label,
    Select,
    Textarea,
    TextInput,
} from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/features/theme/ThemeSlice'
import { getAPIEndpoint } from '@/util/Environment'
import { Build } from '@/interfaces/Build'
import { customTheme } from '@/util/Theme'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'

const IssueForm = () => {
    const mode = useSelector(selectTheme)
    const router = useRouter()
    const strings = useAppSelector(selectTranslations)
    const { product, issueType } = router.query as {
        product: string
        issueType: string
    }

    const selectedVersionRef = useRef<HTMLSelectElement>(null)

    const [availableVersions, setAvailableVersions] = useState<string[]>([])
    const [availableBuilds, setAvailableBuilds] = useState<Build[]>([])
    const [buildsMinState, setBuildsMinState] = useState<number>(0)
    const [buildsMaxState, setBuildsMaxState] = useState<number>(2000)

    useEffect(() => {
        fetch(`${getAPIEndpoint()}/projects/${product}`)
            .then((res) => res.json())
            .then((result) => {
                if (result?.versions && result?.versions.length !== 0)
                    setAvailableVersions(result.versions)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [product])

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (event.target.value && event.target.value.length !== 0)
            fetch(
                `${getAPIEndpoint()}/projects/${product}/${event.target.value}/builds`,
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result?.builds && result?.builds.length !== 0)
                        setAvailableBuilds(result.builds)
                })
                .catch((error) => {
                    console.error(error)
                })
    }

    useEffect(() => {
        handleSelectChange({
            target: { value: selectedVersionRef.current?.value },
        } as unknown as React.ChangeEvent<HTMLSelectElement>)
    }, [availableVersions])

    useEffect(() => {
        if (availableBuilds.length !== 0) {
            setBuildsMinState(
                availableBuilds.length
                    ? availableBuilds
                          .map((build: Build) => build.number)
                          .reduce((a, b) => Math.min(a, b))
                    : 0,
            )
            setBuildsMaxState(
                availableBuilds.length
                    ? availableBuilds
                          .map((build: Build) => build.number)
                          .reduce((a, b) => Math.max(a, b))
                    : 2000,
            )
        }
    }, [availableBuilds])

    return (
        <div>
            <div className={`dark:text-gray-300 mb-2 mt-2`}>
                <p>
                    <span className={`font-bold`}>
                        {strings['report.issue.product']}
                    </span>{' '}
                    - {capitalizeFirstLetter(product)}
                </p>
                <p>
                    <span className={`font-bold`}>
                        {strings['report.issue.type']}
                    </span>{' '}
                    - {capitalizeFirstLetter(issueType)}
                </p>
            </div>
            <Flowbite theme={{ theme: customTheme, mode }}>
                <form className="flex max-w-md flex-col gap-4">
                    <div className="max-w-md" id="select">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="minecraftversions"
                                value={
                                    strings[
                                        'report.issue.form.minecraftversions'
                                    ]
                                }
                            />
                        </div>
                        <Select
                            id="minecraftversions"
                            required
                            ref={selectedVersionRef}
                            onChange={handleSelectChange}
                        >
                            {availableVersions.map((version) => (
                                <option key={version}>{version}</option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="mohistversion"
                                value={`Mohist version (between ${buildsMinState} and ${buildsMaxState})`}
                            />
                            <p className={`text-orange-500 text-sm`}>
                                {strings['report.issue.form.mohistversion']}
                            </p>
                        </div>
                        <TextInput
                            id="mohistversion"
                            required
                            shadow
                            type="number"
                            min={buildsMinState}
                            max={buildsMaxState}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="operatingsystem"
                                value={
                                    strings['report.issue.form.operatingsystem']
                                }
                            />
                        </div>
                        <TextInput
                            id="operatingsystem"
                            required
                            shadow
                            type="text"
                            placeholder={'Windows 10, Ubuntu 20.04, ...'}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="modplugin"
                                value={strings['report.issue.form.modplugin']}
                            />
                        </div>
                        <TextInput
                            id="modplugin"
                            required
                            shadow
                            type="text"
                            placeholder={strings['report.issue.form.modplugin']}
                        />
                    </div>
                    <div className="max-w-md" id="fileUpload">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="file"
                                value={strings['report.issue.form.file']}
                            />
                        </div>
                        <FileInput
                            helperText={
                                strings['report.issue.form.file.helper']
                            }
                            id="file"
                            required
                            multiple={true}
                        />
                    </div>
                    <div className="max-w-md" id="textarea">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="comment"
                                value={strings['report.issue.form.comment']}
                            />
                        </div>
                        <Textarea
                            id="comment"
                            placeholder={
                                strings['report.issue.form.comment.placeholder']
                            }
                            required
                            rows={10}
                        />
                    </div>
                    <Button type="submit">
                        {strings['report.issue.form.submit']}
                    </Button>
                </form>
            </Flowbite>
        </div>
    )
}

export default IssueForm
