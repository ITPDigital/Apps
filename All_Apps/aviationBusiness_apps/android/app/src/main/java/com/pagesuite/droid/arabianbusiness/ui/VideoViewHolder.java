package com.pagesuite.droid.arabianbusiness.ui;


import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.chauthai.swipereveallayout.SwipeRevealLayout;
import com.pagesuite.droid.arabianbusiness.R;
import com.pagesuite.droid.arabianbusiness.model.response.video.VideoRelationUnd;
import com.pagesuite.droid.arabianbusiness.utils.ImageUtility;

public class VideoViewHolder extends RecyclerView.ViewHolder {

    private final VideoItemClickListner mVideoItemClickListner;
    private TextView mVideoDescription;
    private TextView mVideoTime;
    private ImageView mVideoThumbnailImage;

    private ViewGroup videoContainer;
    private VideoRelationUnd mVideoInfo;
    private int mPosition;
    public SwipeRevealLayout swipeLayout;
    private ImageView mShareIcon;
    private ImageView mBookmarkIcon;
    private ImageView mBrandLogo;


    public VideoViewHolder(@NonNull View itemView, VideoItemClickListner videoItemClickListner) {
        super(itemView);
        mVideoItemClickListner = videoItemClickListner;
        initViews(itemView);
    }

    private void initViews(View itemView) {
        mVideoDescription = itemView.findViewById(R.id.video_description);
        mVideoTime = itemView.findViewById(R.id.video_time);
        mVideoThumbnailImage = itemView.findViewById(R.id.video_thumbnail);
        videoContainer = itemView.findViewById(R.id.video_container);
        swipeLayout = itemView.findViewById(R.id.swipe_layout);
        videoContainer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mVideoItemClickListner.onVideoItemClick(mVideoInfo, mPosition);
            }
        });
        mShareIcon = itemView.findViewById(R.id.item_share);
        mBookmarkIcon = itemView.findViewById(R.id.item_bookmark);
        mBrandLogo = itemView.findViewById(R.id.logo);
        setShareIconClick();
        setBookmarkClick();
        setBrandLogoClick();
    }

    private void setBrandLogoClick() {
        if (mBrandLogo != null) {
            mBrandLogo.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mVideoItemClickListner.onBrandLogoClicked(mVideoInfo);
                }
            });
        }
    }

    private void setBookmarkClick() {
        if (mBookmarkIcon != null) {
            mBookmarkIcon.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mVideoItemClickListner.onBookmarkItemClick(mVideoInfo, mPosition);
                }
            });
        }
    }

    private void setShareIconClick() {
        if (mShareIcon != null) {
            mShareIcon.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mVideoItemClickListner.onShareItemClick(mVideoInfo, mPosition);
                }
            });
        }
    }

    public void onBindData(VideoRelationUnd videoInfo, int position) {
        mVideoInfo = videoInfo;
        mPosition = position;
        assignDataToViews(videoInfo);
        setBookmarkIcon(videoInfo);
    }

    private void setBookmarkIcon(VideoRelationUnd videoInfo) {
        if (mBookmarkIcon != null) {
            if (videoInfo.getBookmarked()) {
                //mBookmarkIcon.setImageDrawable(ContextCompat.getDrawable(mBookmarkIcon.getContext(), R.drawable.ic_bookmark));
            } else {
               // mBookmarkIcon.setImageDrawable(ContextCompat.getDrawable(mBookmarkIcon.getContext(), R.drawable.ic_un_bookmark));
            }
        }
    }

    private void assignDataToViews(VideoRelationUnd videoInfo) {
        if (videoInfo != null)
            mVideoDescription.setText(videoInfo.getTitle());
        mVideoTime.setText("3:20");
        ImageUtility.loadImage(mVideoThumbnailImage, videoInfo.getImage());
        if (mBrandLogo != null)
            ImageUtility.loadImage(mBrandLogo, videoInfo.getBrandLogo());
    }

    public interface VideoItemClickListner {
        void onVideoItemClick(VideoRelationUnd videoInfo, int position);

        void onShareItemClick(VideoRelationUnd videoInfo, int position);

        void onBookmarkItemClick(VideoRelationUnd videoInfo, int position);

        void onBrandLogoClicked(VideoRelationUnd videoInfo);

    }

}