package com.pagesuite.droid.arabianbusiness.ui;

import android.content.Context;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.chauthai.swipereveallayout.ViewBinderHelper;
import com.pagesuite.droid.arabianbusiness.R;
import com.pagesuite.droid.arabianbusiness.model.response.video.VideoRelation;

public class VideoListRecyclerViewAdapter extends RecyclerView.Adapter<VideoViewHolder> {

    private final VideoViewHolder.VideoItemClickListner mVideoItemClickListner;
    private  VideoRelation mVideoRelation;
    private final ViewBinderHelper binderHelper = new ViewBinderHelper();


    public VideoListRecyclerViewAdapter(VideoRelation videoRelation, VideoViewHolder.VideoItemClickListner videoItemClickListner) {
        mVideoRelation = videoRelation;
        mVideoItemClickListner = videoItemClickListner;
        binderHelper.setOpenOnlyOne(true);
    }

    @NonNull
    @Override
    public VideoViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        LayoutInflater layoutInflater = (LayoutInflater) viewGroup.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = layoutInflater.inflate(R.layout.video_list_view_item, viewGroup, false);
        return new VideoViewHolder(view, mVideoItemClickListner);
    }

    @Override
    public void onBindViewHolder(@NonNull VideoViewHolder videoViewHolder, int i) {
        if (videoViewHolder.swipeLayout != null)
            binderHelper.bind(videoViewHolder.swipeLayout, i + "");
        videoViewHolder.onBindData(mVideoRelation.getUnd().get(i), i);

    }

    @Override
    public int getItemCount() {
        if (mVideoRelation != null && mVideoRelation.getUnd() != null)
            return mVideoRelation.getUnd().size();
        else return -1;
    }

    public void setData(VideoRelation videoRelation){
        mVideoRelation = videoRelation;
    }


}