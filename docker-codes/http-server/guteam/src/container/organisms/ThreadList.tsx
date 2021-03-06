/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getCommunity, getCommunityThreads } from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';
import { CommunityType, ThreadType } from 'common/CustomTypes';
import { ProgressState, setProgress } from 'common/features/progressSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';

import ThreadList from 'presentational/organisms/ThreadList';

const ExtendedThreadList: VFC = () => {
  const token = useToken();

  const dispatch = useDispatch();
  const progressJson = useSelector((state: ProgressState) => state.progress);
  const updateProgress = (state: boolean) => {
    dispatch(setProgress(state));
  };

  const { communityid } = useParams<{ communityid: string }>();

  const [community, setCommunity] = useState<CommunityType>();
  const [threads, setThreads] = useState<ThreadType[]>();

  const load = useCallback(async () => {
    if (token) {
      try {
        const c = await getCommunity(token, communityid);
        setCommunity(c);
        updateProgress(false);
      } catch {
        dispatch(
          setSnackbarState({
            open: true,
            type: 'error',
            message:
              'データの取得に失敗しました。しばらく時間をおいて再試行してください。',
          })
        );
        updateProgress(false);
      }

      // NOTE:スレッド検索で404エラーが出た場合は、Snackbarを表示しない設定とする
      try {
        const cts = await getCommunityThreads(token, communityid);
        setThreads(cts);
      } catch {
        updateProgress(false);
      }
    }
  }, [community?.id, token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, community?.id]);

  return (
    <>
      <ThreadList
        threads={threads as ThreadType[]}
        community={community?.name as string}
        isLoading={Object.values(progressJson)[0] as boolean}
      />
    </>
  );
};

export default ExtendedThreadList;
