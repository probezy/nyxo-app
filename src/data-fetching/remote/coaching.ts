import { createCoachingData, updateCoachingData } from '@graphql/mutations'
import { getCoachingData, listCoachingDatas } from '@graphql/queries'
import {
  CreateCoachingDataInput,
  CreateCoachingDataMutation,
  GetCoachingDataQuery,
  ListCoachingDatasQuery,
  UpdateCoachingDataInput,
  UpdateCoachingDataMutation,
  Stage
} from '@API'
import { graphqlOperation, API, Auth } from 'aws-amplify'
import { updateUserData } from '@data-fetching/remote/user'
import { isLoggedIn } from '@helpers/auth'

type Response = Exclude<
  ListCoachingDatasQuery['listCoachingDatas'],
  null
>['items']
export const listCoaching = async (): Promise<Response> => {
  try {
    if (await isLoggedIn()) {
      const {
        data: { listCoachingDatas: data }
      } = (await API.graphql(graphqlOperation(listCoachingDatas))) as {
        data: ListCoachingDatasQuery
      }

      if (data?.items) {
        return data?.items
      }
      return []
    }
    return []
  } catch (error) {
    return error
  }
}

export const getCoaching = async (
  key: string,
  { id }: { id: string }
): Promise<GetCoachingDataQuery['getCoachingData']> => {
  try {
    const {
      data: { getCoachingData: data }
    } = (await API.graphql(graphqlOperation(getCoachingData, { id }))) as {
      data: GetCoachingDataQuery
    }

    return data
  } catch (error) {
    return error
  }
}

export const createCoaching = async ({
  coaching
}: {
  coaching: CreateCoachingDataInput
}): Promise<CreateCoachingDataMutation> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const input: CreateCoachingDataInput = {
      ...coaching,
      userId: username
    }

    const { data } = (await API.graphql(
      graphqlOperation(createCoachingData, { input })
    )) as {
      data: CreateCoachingDataMutation
    }
    return data
  } catch (error) {
    return error
  }
}

export const createCoachingAndSetActive = async ({
  coaching
}: {
  coaching: CreateCoachingDataInput
}): Promise<CreateCoachingDataMutation> => {
  try {
    const { username } = await Auth.currentUserInfo()
    const input: CreateCoachingDataInput = {
      ...coaching,
      userId: username
    }

    const { data } = (await API.graphql(
      graphqlOperation(createCoachingData, { input })
    )) as {
      data: CreateCoachingDataMutation
    }

    await updateUserData({
      user: { id: '', userActiveCoachingId: data.createCoachingData?.id }
    })

    return data
  } catch (error) {
    return error
  }
}

export const updateCoaching = async ({
  coaching
}: {
  coaching: UpdateCoachingDataInput
}): Promise<UpdateCoachingDataMutation> => {
  try {
    const { username } = await Auth.currentUserInfo()

    const input: UpdateCoachingDataInput = {
      ...coaching,
      userId: username
    }

    const { data } = (await API.graphql(
      graphqlOperation(updateCoachingData, { input })
    )) as {
      data: UpdateCoachingDataMutation
    }
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}
