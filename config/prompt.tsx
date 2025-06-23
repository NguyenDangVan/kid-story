export function getCreateStoryPrompt({
  ageGroup,
  storyType,
  imageStyle,
  storySubject,
}: {
  ageGroup: string;
  storyType: string;
  imageStyle: string;
  storySubject: string;
}) {
  return `Create a kids story based on the following details:
    - Age group: ${ageGroup}
    - Story type: ${storyType}
    - Image style: ${imageStyle}
    - Story subject: ${storySubject}

    Requirements:
    - Return ONLY a single JSON object with the following fields:
    - storyTitle: string
    - storyCoverPrompt: { prompt: string, style: string }
    - chapters: an array of 5 objects, each with:
        - chapterNumber: number
        - chapterTitle: string
        - storyText: string
        - imagePrompt: { prompt: string, style: string }
    - Do NOT include any explanation, extra text, or markdown/code block formatting. Only return the raw JSON object.`;
}
