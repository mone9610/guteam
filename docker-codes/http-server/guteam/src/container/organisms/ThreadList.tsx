/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getCommunity, getCommunityThread } from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';
import { CommunityData, ThreadData } from 'common/CustomTypes';
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

  const [community, setCommunity] = useState<CommunityData>();
  const [threads, setThreads] = useState<ThreadData[]>();

  const load = useCallback(() => {
    if (token) {
      void getCommunity(token, communityid).then((c) => {
        if (c === undefined) {
          dispatch(
            setSnackbarState({
              open: true,
              type: 'error',
              message:
                'データの取得に失敗しました。しばらく時間をおいて再試行してください。',
            })
          );
          updateProgress(false);
        } else {
          setCommunity(c);
        }
      });
    }
    if (community?.id) {
      void getCommunityThread(token, communityid).then((cts) => {
        setThreads(cts);
        updateProgress(false);
      });
    }
  }, [community?.id, token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, community?.id]);

  return (
    <ThreadList
      threads={threads as ThreadData[]}
      community={community?.name as string}
      isLoading={Object.values(progressJson)[0] as boolean}
    />
  );
};

export default ExtendedThreadList;
