import { GITHUB_TOKEN } from "@env"
import { Octokit } from '@octokit/rest'
import axios, { type AxiosResponse } from 'axios'
import { XMLParser } from 'fast-xml-parser'

import type { GuideLatLng } from '../types/data-types'

// NODEJS
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN 

if (!GITHUB_TOKEN)
  console.info(
    "Github Token is not set! Without github requests are limited to 60/h.",
  )

export interface GithubEntry {
  uri: string
  path: string
}

export const githubApi = {
  parseUrl: (url: string): { owner: string; repo: string } => {
    const regex = /github\.com\/([^/]+)\/([^/]+)/
    const match = url.match(regex)
    if (match?.[1] && match?.[2]) {
      return {
        owner: match?.[1],
        repo: match?.[2],
      }
    }
    throw new Error('Invalid GitHub URL')
  },

  fetchRepoEntries: async function fetchRepoEntries(
    url: string,
    ref = 'main',
  ): Promise<{ kind: 'ok'; entries: GithubEntry[] }> {
    async function fetchRepoEntriesHelper(path: string): Promise<GithubEntry[]> {
      const entries: GithubEntry[] = []
      const { owner, repo } = githubApi.parseUrl(url)

      // Fetch the contents of the specified path within the repository
      // const octokit = new Octokit({ auth: GITHUB_TOKEN })
      const octokit = new Octokit()

      const result = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref,
      })

      if (Array.isArray(result.data)) {
        // Use reduce to chain promises sequentially
        await result.data.reduce(async (previousPromise, item) => {
          // Wait for the previous promise to complete before processing the next item
          await previousPromise

          if (item.type === 'dir') {
            // Recursively fetch the contents of the subdirectory
            const subDirEntries = await fetchRepoEntriesHelper(item.path)
            // subDirEntries.forEach((entry) => {
            //   entries.push(entry)
            // })
            for (const entry of subDirEntries) {
              entries.push(entry)
            }
          } else if (item.download_url !== null) {
            // Create an entry object for files

            const entry: GithubEntry = {
              uri: item.download_url,
              // status: "pending",
              path: item.path,
            }
            entries.push(entry)
          } else {
            console.error(`There is no download url defined for ${item.name}!`)
          }
        }, Promise.resolve()) // Initial promise for reduce to start with
      } else if (result.data.download_url !== null) {
        // If result.data is not an array, it means it's a single file entry
        const entry: GithubEntry = {
          uri: result.data.download_url,
          path: result.data.path,
          // status: "pending",
        }
        entries.push(entry)
      } else {
        console.error(
          `There is no download url defined for ${result.data.name}!`,
        )
      }
      return entries
    }
    try {
      const entries = await fetchRepoEntriesHelper('')
      return { kind: 'ok', entries }
    } catch (error) {
      console.error('Error fetching repository directory structure:', error)
      throw error
    }
  },

  downloadString: async (downloadUrl: string): Promise<string> => {
    try {
      const response: AxiosResponse<string> = await axios.get(downloadUrl, {
        responseType: 'text', // Ensure Axios expects text data
      })
      return response.data
    } catch (error) {
      console.error(`Error downloading Text from: ${downloadUrl} \n ${error}`)

      throw error
    }
  },

  downloadPath: async (downloadUrl: string): Promise<GuideLatLng[]> => {
    try {
      const response: AxiosResponse<string> = await axios.get(downloadUrl, {
        responseType: 'text', // Ensure Axios expects text data
      })

      const options = {
        attributeNamePrefix: '',
        ignoreAttributes: false,
      }

      const parser = new XMLParser(options)
      const gpx = parser.parse(response.data)

      const coordinates: GuideLatLng[] = gpx.gpx.trk.trkseg.trkpt.map(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (point: any) => ({
          latitude: Number(point.lat),
          longitude: Number(point.lon),
        }),
      )
      return coordinates
    } catch (error) {
      console.error(`Error downloading Text from: ${downloadUrl} \n ${error}`)

      throw error
    }
  },
}
