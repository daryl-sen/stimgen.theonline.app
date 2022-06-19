# Stimgen

IMPORTANT UPDATE:
Version 4 is in the works, with a major UI and UX revamp. 

Stimgen is an online software that generates images for running <a href="http://www.sfu.ca/psychology/research/vlab/research.html">change blindness</a> experiments. It is highly configurable, with options for image size, colors, individual stimulus size, and the number of stimuli on screen.

## What does it do?

Every run generates a pair of images containing colored blocks. Each pair is identical except for one single block, which is the locus of change in change blindness experiments. There are two modes of operation - flip mode and change mode. In flip mode, the colors for one of the blocks will be swapped in the second image; in the change mode, the colors will be sampled at random from a list of colors defined by the user.

The user can use a coordinate system to determine sectors in which the locus of change can occur in.

The image pair can then be saved to an online list for testing, or downloaded to a computer.


## Current deployment

Simgen is one of many stimulus generators, and is currently in use at the Vision Lab at Simon Fraser University.

![Example output from generator](https://github.com/daryl-sen/stimgen-blocks/blob/master/documents/screencapture-vlab-pythonanywhere-run-flip-Example-Session-2021-03-29-00_04_03.png?raw=true)

This is the newer version that includes generating blocks equi-distant from the center of the image, and refactored with UI and performance enhancements.
