/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-nocheck
import {GoogleAuth, GoogleAuthOptions} from 'google-auth-library';
import {ToolConfig} from './tool';
import {SchemaType, Schema} from './common';

/**
 * Params used to initialize the Vertex SDK.
 */
export declare interface VertexInit {
  /**
   * Optional. The Google Cloud project ID. It is not the numeric project name.
   * If not provided, SDK will try to resolve it from runtime environment.
   * If still not cannot resovle project ID, SDK will throw exception.
   */
  project?: string;
  /**
   * Optional. The Google Cloud project location. If not provided, SDK will
   * firtly try to resolve it from runtime environment. If no location resolved
   * from runtime environment, SDK will use default value `us-central1`.
   */
  location?: string;
  /**
   * Optional. The base Vertex AI endpoint to use for the request. If not
   * provided, the default regionalized endpoint (i.e.
   * us-central1-aiplatform.googleapis.com) will be used.
   */
  apiEndpoint?: string;
  /**
   * Optional. The Authentication options provided by google-auth-library.
   * Complete list of authentication options is documented in the
   * GoogleAuthOptions interface:
   * https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/googleauth.ts.
   */
  googleAuthOptions?: GoogleAuthOptions;
}

/**
 * Params used to call the generateContent method.
 */
export declare interface GenerateContentRequest extends BaseModelParams {
  /** Array of {@link Content}.*/
  contents: Content[];
  /**
   * Optional. The user provided system instructions for the model.
   * Note: only text should be used in parts of {@link Content}
   */
  systemInstruction?: string | Content;

  /**
   * Optional. The name of the cached content used as context to serve the prediction.
   * This is the name of a `CachedContent` and not the cache object itself.
   */
  cachedContent?: string;

  /**
   * Optional. Custom metadata labels for organizing API calls and managing costs at scale. See
   * https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/add-labels-to-api-calls
   */
  labels?: Record<string, string>;
}

/**
 * Params used to call the countTokens method.
 */
export declare interface CountTokensRequest {
  /** Array of {@link Content}. */
  contents: Content[];
}

/**
 * Response returned from countTokens method.
 */
export declare interface CountTokensResponse {
  /**
   * The total number of tokens counted across all instances from the request.
   */
  totalTokens: number;
  /**
   * Optional. The total number of billable characters counted across all
   * instances from the request.
   */
  totalBillableCharacters?: number;
}

/**
 * Params used to call the getGenerativeModel method.
 */
export declare interface GetGenerativeModelParams extends ModelParams {
  /** The name of the model to get. */
  model: string;
  /** The Google Cloud project to use for the request. */
  project: string;
  /** The Google Cloud project location to use for the request. */
  location: string;
  /**
   * GoogleAuth class instance that handles authentication.
   * Details about GoogleAuth is referred to
   * https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/googleauth.ts
   */
  googleAuth: GoogleAuth;
  /**
   * Optional. The base Vertex AI endpoint to use for the request. If not
   * provided, the default regionalized endpoint (i.e.
   * us-central1-aiplatform.googleapis.com) will be used.
   */
  apiEndpoint?: string;
  /** Optional. The configuration to use for generation. */
  generationConfig?: GenerationConfig;
  /** Optional. The safety settings to use for generation. */
  safetySettings?: SafetySetting[];
  /** Optional. The tools to use for generation. */
  tools?: Tool[];
  /** Optional. This config is shared for all tools provided in the request. */
  toolConfig?: ToolConfig;
  /** Optional. The request options to use for generation. */
  requestOptions?: RequestOptions;
  /**
   * Optional. The user provided system instructions for the model.
   * Note: only text should be used in parts of {@link Content}
   */
  systemInstruction?: string | Content;
}

/**
 * Configuration for initializing a model, for example via getGenerativeModel in
 * VertexAI class.
 */
export declare interface ModelParams extends BaseModelParams {
  /**
   * The name of the model.
   * @example "gemini-1.0-pro".
   */
  model: string;

  /**
   * Optional. The cached content used as context to serve the prediction.
   * Note: only used in explicit caching, where users can have control over caching
   * (e.g. what content to cache) and enjoy guaranteed cost savings.
   */
  cachedContent?: CachedContent;
}

/**
 * Base params for initializing a model or calling GenerateContent.
 */
export declare interface BaseModelParams {
  /** Optional. Array of {@link SafetySetting}. */
  safetySettings?: SafetySetting[];
  /** Optional.  {@link GenerationConfig}. */
  generationConfig?: GenerationConfig;
  /** Optional. Array of {@link Tool}. */
  tools?: Tool[];
  /** Optional. This config is shared for all tools provided in the request. */
  toolConfig?: ToolConfig;
  /**
   * Optional. The user provided system instructions for the model.
   * Note: only text should be used in parts of {@link Content}
   */
  systemInstruction?: string | Content;
}

/**
 * Safety feedback for an entire request.
 */
export declare interface SafetySetting {
  /** The harm category. {@link HarmCategory} */
  category: HarmCategory;
  /** The harm threshold. {@link HarmBlockThreshold} */
  threshold: HarmBlockThreshold;
}

/**
 * Schema passed to `GenerationConfig.responseSchema`
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResponseSchema extends Schema {}

/**
 * Configuration options for model generation and outputs.
 */
export declare interface GenerationConfig {
  /** Optional. If true, the timestamp of the audio will be included in the response. */
  audioTimestamp?: boolean;
  /** Optional. Number of candidates to generate. */
  candidateCount?: number;
  /** Optional. Stop sequences. */
  stopSequences?: string[];
  /** Optional. The maximum number of output tokens to generate per message. */
  maxOutputTokens?: number;
  /** Optional. Controls the randomness of predictions. */
  temperature?: number;
  /** Optional. If specified, nucleus sampling will be used. */
  topP?: number;
  /** Optional. If specified, topK sampling will be used. */
  topK?: number;
  /**
   * Optional. Positive values penalize tokens that repeatedly appear in the generated text, decreasing the probability of repeating content.
   * This maximum value for frequencyPenalty is up to, but not including, 2.0. Its minimum value is -2.0.
   * Supported by gemini-1.5-pro and gemini-1.5-flash only. */
  frequencyPenalty?: number;
  /**
   * Optional. Output response mimetype of the generated candidate text.
   * Supported mimetype:
   * - `text/plain`: (default) Text output.
   * - `application/json`: JSON response in the candidates.
   * The model needs to be prompted to output the appropriate response type,
   * otherwise the behavior is undefined.
   */
  responseMimeType?: string;

  /**
   * Optional. The schema that generated candidate text must follow.  For more
   * information, see
   * https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output.
   * If set, a compatible responseMimeType must also be set.
   */
  responseSchema?: ResponseSchema;
}

/**
 * Harm categories that will block the content.
 */
export enum HarmCategory {
  /** The harm category is unspecified. */
  HARM_CATEGORY_UNSPECIFIED = 'HARM_CATEGORY_UNSPECIFIED',
  /** The harm category is hate speech. */
  HARM_CATEGORY_HATE_SPEECH = 'HARM_CATEGORY_HATE_SPEECH',
  /** The harm category is dangerous content. */
  HARM_CATEGORY_DANGEROUS_CONTENT = 'HARM_CATEGORY_DANGEROUS_CONTENT',
  /** The harm category is harassment. */
  HARM_CATEGORY_HARASSMENT = 'HARM_CATEGORY_HARASSMENT',
  /** The harm category is sexually explicit content. */
  HARM_CATEGORY_SEXUALLY_EXPLICIT = 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
}

/**
 * Probability based thresholds levels for blocking.
 */
export enum HarmBlockThreshold {
  /** Unspecified harm block threshold. */
  HARM_BLOCK_THRESHOLD_UNSPECIFIED = 'HARM_BLOCK_THRESHOLD_UNSPECIFIED',
  /** Block low threshold and above (i.e. block more). */
  BLOCK_LOW_AND_ABOVE = 'BLOCK_LOW_AND_ABOVE',
  /** Block medium threshold and above. */
  BLOCK_MEDIUM_AND_ABOVE = 'BLOCK_MEDIUM_AND_ABOVE',
  /** Block only high threshold (i.e. block less). */
  BLOCK_ONLY_HIGH = 'BLOCK_ONLY_HIGH',
  /** Block none. */
  BLOCK_NONE = 'BLOCK_NONE',
  /** Turn off the safety filter. */
  OFF = 'OFF',
}

/**
 * Harm probability levels in the content.
 */
export enum HarmProbability {
  /** Harm probability unspecified. */
  HARM_PROBABILITY_UNSPECIFIED = 'HARM_PROBABILITY_UNSPECIFIED',
  NEGLIGIBLE = 'NEGLIGIBLE',
  /** Low level of harm. */
  LOW = 'LOW',
  /** Medium level of harm. */
  MEDIUM = 'MEDIUM',
  /** High level of harm. */
  HIGH = 'HIGH',
}

/**
 * Harm severity levels
 */
export enum HarmSeverity {
  /** Harm severity unspecified. */
  HARM_SEVERITY_UNSPECIFIED = 'HARM_SEVERITY_UNSPECIFIED',
  /** Negligible level of harm severity. */
  HARM_SEVERITY_NEGLIGIBLE = 'HARM_SEVERITY_NEGLIGIBLE',
  /** Low level of harm severity. */
  HARM_SEVERITY_LOW = 'HARM_SEVERITY_LOW',
  /** Medium level of harm severity. */
  HARM_SEVERITY_MEDIUM = 'HARM_SEVERITY_MEDIUM',
  /** High level of harm severity. */
  HARM_SEVERITY_HIGH = 'HARM_SEVERITY_HIGH',
}
/**
 * Safety rating corresponding to the generated content.
 */
export declare interface SafetyRating {
  /** The harm category. {@link HarmCategory} */
  category?: HarmCategory;
  /** The harm probability. {@link HarmProbability} */
  probability?: HarmProbability;
  /** The harm probability score. */
  probabilityScore?: number;
  /** The harm severity.level {@link HarmSeverity} */
  severity?: HarmSeverity;
  /** The harm severity score. */
  severityScore?: number;
}

/**
 * The base structured datatype containing multi-part content of a message.
 */
export declare interface Content {
  /** Array of {@link Part}. */
  parts: Part[];
  /** The producer of the content. */
  role: string;
}

/**
 * A part of a turn in a conversation with the model with a fixed MIME type.
 * It has one of the following mutually exclusive fields:
 * 1. text
 * 2. inlineData
 * 3. fileData
 * 4. functionResponse
 * 5. functionCall
 */
// TODO: Adjust so one must be true.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BasePart {}

/**
 * A text part of a conversation with the model.
 */
export interface TextPart extends BasePart {
  /** Only this property is expected for TextPart. */
  text: string;
  /** inlineData is not expected for TextPart. */
  inlineData?: never;
  /** fileData is not expected for TextPart. */
  fileData?: never;
  /** functionResponse is not expected for TextPart. */
  functionResponse?: never;
  /** functionCall is not expected for TextPart. */
  functionCall?: never;
}

/**
 * An inline data part of a conversation with the model.
 */
export interface InlineDataPart extends BasePart {
  /** text is not expected for InlineDataPart. */
  text?: never;
  /** Only this property is expected for InlineDataPart. */
  inlineData: GenerativeContentBlob;
  /** fileData is not expected for InlineDataPart. */
  fileData?: never;
  /** functionResponse is not expected for InlineDataPart. */
  functionResponse?: never;
  /** functionCall is not expected for InlineDataPart. */
  functionCall?: never;
}

/**
 * URI based data.
 */
export interface FileData {
  /** The IANA standard MIME type of the source data. */
  mimeType: string;
  /** URI of the file. */
  fileUri: string;
}

/**
 * A file data part of a conversation with the model.
 */
export interface FileDataPart extends BasePart {
  /** text is not expected for FileDataPart. */
  text?: never;
  /** inlineData is not expected for FileDataPart. */
  inlineData?: never;
  /** Only this property is expected for FileDataPart. */
  fileData: FileData;
  /** functionResponse is not expected for FileDataPart. */
  functionResponse?: never;
  /** functionCall is not expected for FileDataPart. */
  functionCall?: never;
}

/**
 * A function response part of a conversation with the model.
 */
export interface FunctionResponsePart extends BasePart {
  /** text is not expected for FunctionResponsePart. */
  text?: never;
  /** inlineData is not expected for FunctionResponsePart. */
  inlineData?: never;
  /** fileData is not expected for FunctionResponsePart. */
  fileData?: never;
  /** Only this property is expected for FunctionResponsePart. */
  functionResponse: FunctionResponse;
  /** functionCall is not expected for FunctionResponsePart. */
  functionCall?: never;
}

/**
 * A function call part of a conversation with the model.
 */
export interface FunctionCallPart extends BasePart {
  /** text is not expected for FunctionCallPart. */
  text?: never;
  /** inlineData is not expected for FunctionCallPart. */
  inlineData?: never;
  /** fileData is not expected for FunctionCallPart. */
  fileData?: never;
  /** functionResponse is not expected for FunctionCallPart. */
  functionResponse?: never;
  /** Only this property is expected for FunctionCallPart. */
  functionCall: FunctionCall;
}

/**
 * A datatype containing media that is part of a multi-part {@link Content}
 * message. A `Part` is a union type of {@link TextPart}, {@link InlineDataPart},
 * {@link FileDataPart}, and {@link FunctionResponsePart}. A
 * `Part` has one of the following mutually exclusive fields:
 * 1. text
 * 2. inlineData
 * 3. fileData
 * 4. functionResponse
 */
export declare type Part =
  | TextPart
  | InlineDataPart
  | FileDataPart
  | FunctionResponsePart
  | FunctionCallPart;

/**
 * Raw media bytes sent directly in the request. Text should not be sent as
 * raw bytes.
 */
export declare interface GenerativeContentBlob {
  /**
   * The MIME type of the source data. The only accepted values: "image/png" or
   * "image/jpeg".
   */
  mimeType: string;
  /** Base64 encoded data. */
  data: string;
}

/**
 * Usage metadata about response(s).
 */
export declare interface UsageMetadata {
  /** Optional. Number of tokens in the request. */
  promptTokenCount?: number;
  /** Optional. Number of tokens in the response(s). */
  candidatesTokenCount?: number;
  /** Optional. Total number of tokens. */
  totalTokenCount?: number;
  /** Optional. Number of tokens in the cached content. */
  cachedContentTokenCount?: number;
}

/**
 * Content filter results for a prompt sent in the request.
 */
export declare interface PromptFeedback {
  /** The reason why the response is blocked. {@link BlockReason}. */
  blockReason: BlockedReason;
  /** Array of {@link SafetyRating} */
  safetyRatings: SafetyRating[];
  /** A readable block reason message. */
  blockReasonMessage?: string;
}

/**
 * The reason why the reponse is blocked.
 */
export enum BlockedReason {
  /** Unspecified blocked reason. */
  BLOCKED_REASON_UNSPECIFIED = 'BLOCK_REASON_UNSPECIFIED',
  /** Candidates blocked due to safety. */
  SAFETY = 'SAFETY',
  /** Candidates blocked due to other reason. */
  OTHER = 'OTHER',
  /** terminology blocklist. */
  BLOCKLIST = 'BLOCKLIST',
  /** Candidates blocked due to prohibited content. */
  PROHIBITED_CONTENT = 'PROHIBITED_CONTENT',
}

/**
 * The reason why the model stopped generating tokens.
 * If empty, the model has not stopped generating the tokens.
 */
export enum FinishReason {
  /** The finish reason is unspecified. */
  FINISH_REASON_UNSPECIFIED = 'FINISH_REASON_UNSPECIFIED',
  /** Natural stop point of the model or provided stop sequence. */
  STOP = 'STOP',
  /** The maximum number of tokens as specified in the request was reached. */
  MAX_TOKENS = 'MAX_TOKENS',
  /**
   * The token generation was stopped as the response was flagged for safety
   * reasons.
   */
  SAFETY = 'SAFETY',
  /**
   * The token generation was stopped as the response was flagged for
   * unauthorized citations.
   */
  RECITATION = 'RECITATION',
  /** All other reasons that stopped the token generation. */
  OTHER = 'OTHER',
  /**
   * The token generation was stopped as the response was flagged for the
   * terms which are included from the terminology blocklist.
   */
  BLOCKLIST = 'BLOCKLIST',
  /**
   * The token generation was stopped as the response was flagged for
   * the prohibited contents.
   */
  PROHIBITED_CONTENT = 'PROHIBITED_CONTENT',
  /**
   * The token generation was stopped as the response was flagged for
   * Sensitive Personally Identifiable Information (SPII) contents.
   */
  SPII = 'SPII',
}

/**
 * Wrapper for respones from a generateContent request.
 */
export declare interface GenerateContentResult {
  /**
   * All GenerateContentResponses received so far. {@link
   * GenerateContentResponse}
   */
  response: GenerateContentResponse;
}

/**
 * Wrapper for respones from a generateContentStream method.
 */
export declare interface StreamGenerateContentResult {
  /** Promise of {@link GenerateContentResponse}. */
  response: Promise<GenerateContentResponse>;
  /**
   * Async iterable that provides one {@link GenerateContentResponse} at a
   * time.
   */
  stream: AsyncGenerator<GenerateContentResponse>;
}

/**
 * Response from the model supporting multiple candidates.
 */
export declare interface GenerateContentResponse {
  /** Array of {@link GenerateContentCandidate}. */
  candidates?: GenerateContentCandidate[];
  /**
   * Optional. This is only populated if there are no candidates due to a
   * safety block. {@link PromptFeedback}.
   */
  promptFeedback?: PromptFeedback;
  /** Optional. {@link UsageMetadata}. */
  usageMetadata?: UsageMetadata;
}

/**
 * A response candidate generated from the model.
 */
export declare interface GenerateContentCandidate {
  /** {@link Content}. */
  content: Content;
  /**
   * Optional. The index of the candidate in the {@link
   * GenerateContentResponse}.
   */
  index: number;
  /**
   * Optional. The reason why the model stopped generating tokens. {@link
   * FinishReason}.
   */
  finishReason?: FinishReason;
  /**
   * Optional. A readable message describing why the model stopped generating
   * tokens.
   */
  finishMessage?: string;
  /** Optional. Array of {@link SafetyRating}. */
  safetyRatings?: SafetyRating[];
  /** Optional. {@link CitationMetadata}. */
  citationMetadata?: CitationMetadata;
  /** Optional. {@link GroundingMetadata}. */
  groundingMetadata?: GroundingMetadata;
}

/**
 * A collection of source attributions for a piece of content.
 */
export declare interface CitationMetadata {
  /** Array of {@link Citation}. */
  citations: Citation[];
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following:
 *
 *   A full date, with non-zero year, month, and day values.
 *   A month and day, with a zero year (for example, an anniversary).
 *   A year on its own, with a zero month and a zero day.
 *   A year and month, with a zero day (for example, a credit card expiration
 *   date).
 */
export declare interface GoogleDate {
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
  /**
   * Month of the date. Must be from 1 to 12, or 0 to specify a year without a
   * monthi and day.
   */
  month?: number;
  /**
   * Day of the date. Must be from 1 to 31 and valid for the year and month.
   * or 0 to specify a year by itself or a year and month where the day isn't
   * significant
   */
  day?: number;
}

/**
 * Source attributions for content.
 */
export declare interface Citation {
  /** Optional. Start index into the content. */
  startIndex?: number;
  /** Optional. End index into the content. */
  endIndex?: number;
  /** Optional. Url reference of the attribution. */
  uri?: string;
  /** Optional. Title of the attribution. */
  title?: string;
  /** Optional. License of the attribution. */
  license?: string;
  /** Optional. Publication date of the attribution. */
  publicationDate?: GoogleDate;
}

/**
 * Google search entry point.
 */
export declare interface SearchEntryPoint {
  /**
   * Optional. Web content snippet that can be embedded in a web page or an app
   * webview.
   */
  renderedContent?: string;
  /** Optional. Base64 encoded JSON representing array of tuple. */
  sdkBlob?: string;
}

/**
 * Grounding chunk from the web.
 */
export declare interface GroundingChunkWeb {
  /** Optional. URI reference of the grounding chunk. */
  uri?: string;
  /** Optional. Title of the grounding chunk. */
  title?: string;
}

/**
 * Grounding chunk from context retrieved by the retrieval tools.
 */
export declare interface GroundingChunkRetrievedContext {
  /** Optional. URI reference of the attribution. */
  uri?: string;
  /** Optional. Title of the attribution. */
  title?: string;
}

/**
 * Grounding chunk.
 */
export declare interface GroundingChunk {
  /** Optional. Grounding chunk from the web. */
  web?: GroundingChunkWeb;
  /**
   * Optional. Grounding chunk from context retrieved by the retrieval tools.
   */
  retrievedContext?: GroundingChunkRetrievedContext;
}

/**
 * Grounding support segment.
 */
export declare interface GroundingSupportSegment {
  /** Optional. The index of a Part object within its parent Content object. */
  partIndex?: number;
  /**
   * Optional. Start index in the given Part, measured in bytes.
   * Offset from the start of the Part, inclusive, starting at zero.
   */
  startIndex?: number;
  /**
   * Optional. End index in the given Part, measured in bytes.
   * Offset from the start of the Part, exclusive, starting at zero.
   */
  endIndex?: number;
  /** Optional. The text corresponding to the segment from the response. */
  text?: string;
}

/**
 * Grounding support.
 */
export declare interface GroundingSupport {
  /** Optional. Segment of the content this support belongs to. */
  segment?: GroundingSupportSegment;
  /**
   * Optional. A arrau of indices (into {@link GroundingChunk}) specifying the
   * citations associated with the claim. For instance [1,3,4] means
   * that grounding_chunk[1], grounding_chunk[3],
   * grounding_chunk[4] are the retrieved content attributed to the claim.
   */
  groundingChunkIndices?: number[];
  /**
   * Confidence score of the support references. Ranges from 0 to 1. 1 is the
   * most confident. This list must have the same size as the
   * groundingChunkIndices.
   */
  confidenceScores?: number[];
}

/**
 * A collection of grounding attributions for a piece of content.
 */
export declare interface GroundingMetadata {
  /** Optional. Web search queries for the following-up web search. */
  webSearchQueries?: string[];
  /** Optional. Queries executed by the retrieval tools. */
  retrievalQueries?: string[];
  /** Optional. Google search entry for the following-up web searches. {@link SearchEntryPoint} */
  searchEntryPoint?: SearchEntryPoint;
  /**
   * Optional. Array of supporting references retrieved from specified
   * grounding source. {@link GroundingChunk}.
   */
  groundingChunks?: GroundingChunk[];
  /** Optional. Array of grounding support. {@link GroundingSupport}. */
  groundingSupports?: GroundingSupport[];
}

/**
 * @deprecated
 * Segment of the content this attribution belongs to.
 */
export declare interface GroundingAttributionSegment {
  /** Optional. The index of a Part object within its parent Content object. */
  partIndex?: number;
  /**
   * Optional. Start index in the given Part, measured in bytes. Offset from the
   * start of the Part, inclusive, starting at zero.
   */
  startIndex?: number;
  /**
   * Optional. End index in the given Part, measured in bytes. Offset from the
   * start of the Part, exclusive, starting at zero.
   */
  endIndex?: number;
}

/**
 * @deprecated
 * Attribution from the web.
 */
export declare interface GroundingAttributionWeb {
  /** Optional. URI reference of the attribution. */
  uri?: string;
  /** Optional. Title of the attribution. */
  title?: string;
}

/**
 * @deprecated
 * Attribution from context retrieved by the retrieval tools.
 */
export declare interface GroundingAttributionRetrievedContext {
  /** Optional. URI reference of the attribution. */
  uri?: string;
  /** Optional. Title of the attribution. */
  title?: string;
}

/**
 * A predicted FunctionCall returned from the model that contains a string
 * representating the FunctionDeclaration.name with the parameters and their
 * values.
 */
export declare interface FunctionCall {
  /** The name of the function specified in FunctionDeclaration.name. */
  name: string;
  /** The arguments to pass to the function. */
  args: object;
}

/**
 * The result output of a FunctionCall that contains a string representing
 * the FunctionDeclaration.name and a structured JSON object containing any
 * output from the function call. It is used as context to the model.
 */
export declare interface FunctionResponse {
  /** The name of the function specified in FunctionDeclaration.name. */
  name: string;
  /** The expected response from the model. */
  response: object;
}

/**
 * Structured representation of a function declaration as defined by the
 * [OpenAPI 3.0 specification](https://spec.openapis.org/oas/v3.0.3). Included
 * in this declaration are the function name and parameters. This
 * FunctionDeclaration is a representation of a block of code that can be used
 * as a Tool by the model and executed by the client.
 */
export declare interface FunctionDeclaration {
  /**
   * The name of the function to call. Must start with a letter or an
   * underscore. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with
   * a max length of 64.
   */
  name: string;
  /**
   * Optional. Description and purpose of the function. Model uses it to decide
   * how and whether to call the function.
   */
  description?: string;
  /**
   * Optional. Describes the parameters to this function in JSON Schema Object
   * format. Reflects the Open API 3.03 Parameter Object. string Key: the name
   * of the parameter. Parameter names are case sensitive. Schema Value: the
   * Schema defining the type used for the parameter. For function with no
   * parameters, this can be left unset.
   *
   * @example with 1 required and 1 optional parameter: type: OBJECT properties:
   * ```
   * param1:
   *
   *   type: STRING
   * param2:
   *
   *  type: INTEGER
   * required:
   *
   *   - param1
   * ```
   */
  parameters?: FunctionDeclarationSchema;
}

/**
 * A FunctionDeclarationsTool is a piece of code that enables the system to
 * interact with external systems to perform an action, or set of actions,
 * outside of knowledge and scope of the model.
 */
export declare interface FunctionDeclarationsTool {
  /**
   * Optional. One or more function declarations
   * to be passed to the model along with the current user query. Model may
   * decide to call a subset of these functions by populating
   * [FunctionCall][content.part.functionCall] in the response. User should
   * provide a [FunctionResponse][content.part.functionResponse] for each
   * function call in the next turn. Based on the function responses, Model will
   * generate the final response back to the user. Maximum 64 function
   * declarations can be provided.
   */
  functionDeclarations?: FunctionDeclaration[];
}

/**
 * Defines a retrieval tool that model can call to access external knowledge.
 */
export declare interface RetrievalTool {
  /** Optional. {@link Retrieval}. */
  retrieval?: Retrieval;
}

export declare interface VertexRagStore {
  /**
   * Optional. List of corpora for retrieval. Currently only support one corpus
   * or multiple files from one corpus. In the future we may open up multiple
   * corpora support.
   */
  ragResources?: RagResource[];

  /** Optional. Number of top k results to return from the selected corpora. */
  similarityTopK?: number;

  /**
   * Optional. If set this field, results with vector distance smaller than
   * this threshold will be returned.
   */
  vectorDistanceThreshold?: number;
}

/**
 * Config of Vertex RagStore grounding checking.
 */
export declare interface RagResource {
  /**
   * Optional. Vertex RAG Store corpus resource name.
   *
   * @example
   * `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`
   */
  ragCorpus?: string;

  /**
   * Optional. Set this field to select the files under the ragCorpora for
   * retrieval.
   */
  ragFileIds?: string[];
}

/**
 * Defines a retrieval tool that model can call to access external knowledge.
 */
export declare interface GoogleSearchRetrievalTool {
  /** Optional. {@link GoogleSearchRetrieval}. */
  googleSearchRetrieval?: GoogleSearchRetrieval;
}

/** Defines a tool that model can call to access external knowledge. */
export declare type Tool =
  | FunctionDeclarationsTool
  | RetrievalTool
  | GoogleSearchRetrievalTool;

/**
 * Defines a retrieval tool that model can call to access external knowledge.
 */
export declare interface Retrieval {
  /**
   * Optional. Set to use data source powered by Vertex AI Search. {@link
   * VertexAISearch}.
   */
  vertexAiSearch?: VertexAISearch;

  /** Optional. Set to use data source powered by Vertex RAG store. */
  vertexRagStore?: VertexRagStore;

  /**
   * Optional. Disable using the result from this tool in detecting grounding
   * attribution. This does not affect how the result is given to the model for
   * generation.
   */
  disableAttribution?: boolean;
}

export enum Mode {
  MODE_UNSPECIFIED = 'MODE_UNSPECIFIED',
  MODE_DYNAMIC = 'MODE_DYNAMIC',
}

/** Describes the options to customize dynamic retrieval. */
export declare interface DynamicRetrievalConfig {
  /** Optional. The threshold to be used in dynamic retrieval. If not set, a system default value is used. */
  dynamicThreshold?: number;
  /** The mode of the predictor to be used in dynamic retrieval. */
  mode?: Mode;
}

/**
 * Tool to retrieve public web data for grounding, powered by Google.
 */
export declare interface GoogleSearchRetrieval {
  /** Specifies the dynamic retrieval configuration for the given source. */
  dynamicRetrievalConfig?: DynamicRetrievalConfig;
}

/**
 * Retrieve from Vertex AI Search datastore for grounding.
 */
export declare interface VertexAISearch {
  /**
   * Fully-qualified Vertex AI Search's datastore resource ID. See
   * https://cloud.google.com/vertex-ai-search-and-conversation
   *
   * @example
   * "projects/<>/locations/<>/collections/<>/dataStores/<>"
   */
  datastore: string;
}

/**
 * Contains the list of OpenAPI data types
 * as defined by https://swagger.io/docs/specification/data-models/data-types/
 */
export declare type FunctionDeclarationSchemaType = SchemaType;
export const FunctionDeclarationSchemaType = {...SchemaType};

/**
 * Schema for parameters passed to {@link FunctionDeclaration.parameters}.
 */
export interface FunctionDeclarationSchema {
  /** The type of the parameter. */
  type: SchemaType;
  /** The format of the parameter. */
  properties: {[k: string]: FunctionDeclarationSchemaProperty};
  /** Optional. Description of the parameter. */
  description?: string;
  /** Optional. Array of required parameters. */
  required?: string[];
}

/**
 * FunctionDeclarationSchemaProperty is used to define the format of
 * input/output data. Represents a select subset of an OpenAPI 3.0 schema object.
 * More fields may be added in the future as needed.
 */
export type FunctionDeclarationSchemaProperty = Schema;

/**
 * Params to initiate a multiturn chat with the model via startChat.
 */
export declare interface StartChatParams {
  /** Optional. History of the chat session. {@link Content} */
  history?: Content[];
  /** Optional. Array of {@link SafetySetting}. */
  safetySettings?: SafetySetting[];
  /** Optional. {@link GenerationConfig}. */
  generationConfig?: GenerationConfig;
  /** Optional. Array of {@link Tool}. */
  tools?: Tool[];
  /** Optional. This config is shared for all tools provided in the request. */
  toolConfig?: ToolConfig;
  /** Optional. The base Vertex AI endpoint to use for the request. */
  apiEndpoint?: string;
  /**
   * Optional. The user provided system instructions for the model.
   * Note: only text should be used in parts of {@link Content}
   */
  systemInstruction?: string | Content;
  /**
   * Optional. The name of the cached content used as context to serve the prediction.
   * This is the name of a `CachedContent` and not the cache object itself.
   */
  cachedContent?: string;
}

/**
 * All params passed to initiate multiturn chat via startChat.
 */
export declare interface StartChatSessionRequest extends StartChatParams {
  /** The Google Cloud project to use for the request. */
  project: string;
  /** The Google Cloud project location to use for the request. */
  location: string;
  /** The Google Auth to use for the request. */
  googleAuth: GoogleAuth;
  /** The publisher model endpoint to use for the request. */
  publisherModelEndpoint: string;
  /** The resource path to use for the request. */
  resourcePath: string;
  /**
   * Optional. The user provided system instructions for the model.
   * Note: only text should be used in parts of {@link Content}
   */
  systemInstruction?: string | Content;
}

/**
 * Request options params passed to getGenerativeModel method in VertexAI class.
 */
export interface RequestOptions {
  /** timeout in milli seconds. time out value needs to be non negative. */
  timeout?: number;
  /**
   * Value for x-goog-api-client header to set on the API request. This is
   * intended for wrapper SDKs to set additional SDK identifiers for the
   * backend.
   */
  apiClient?: string;
  /**
   * Value for custom HTTP headers to set on the HTTP request.
   */
  customHeaders?: Headers;
}

/**
 * Request options params passed to generateContent** functions.
 * sets options for a single request. overwrites defined per-class RequestOptions
 */
export interface SessionRequestOptions extends RequestOptions {
  /** timeout in milli seconds. time out value needs to be non negative. a signal can abort request before timeout */
  timeout?: number;

  /** signal to cancel request */
  signal?: AbortSignal
}

/**
 * A resource used in LLM queries for users to explicitly specify
 * what to cache and how to cache.
 */
export interface CachedContent {
  /**
   * Immutable. Identifier. The server-generated resource name of the cached content.
   * Format: projects/{project}/locations/{location}/cachedContents/{cached_content}
   */
  name?: string;

  /** Optional. Immutable. The user-generated meaningful display name of the cached content. */
  displayName?: string;

  /**
   * Immutable. The name of the publisher model to use for cached content.
   * Format: projects/{project}/locations/{location}/publishers/{publisher}/models/{model}
   */
  model?: string;

  /** Developer set system instruction. Currently, text only. */
  systemInstruction?: Content | string;

  /** Optional. Input only. Immutable. The content to cache. */
  contents?: Content[];

  /** Optional. Input only. Immutable. A list of `Tools` the model may use to generate the next response. */
  tools?: Tool[];

  /** Optional. Input only. Immutable. Tool config. This config is shared for all tools. */
  toolConfig?: ToolConfig;

  /**
   * Output only. Creatation time of the cache entry.
   * Format: google-datetime. See {@link https://cloud.google.com/docs/discovery/type-format}
   */
  createTime?: string;

  /**
   * Output only. When the cache entry was last updated in UTC time.
   * Format: google-datetime. See {@link https://cloud.google.com/docs/discovery/type-format}
   */
  updateTime?: string;

  /** Output only. Metadata on the usage of the cached content. */
  usageMetadata?: CachedContentUsageMetadata;

  /**
   * Timestamp of when this resource is considered expired.
   * This is *always* provided on output, regardless of what was sent on input.
   */
  expireTime?: string;

  /**
   * Input only. The TTL seconds for this resource. The expiration time
   * is computed: now + TTL.
   * Format: google-duration. See {@link https://cloud.google.com/docs/discovery/type-format}
   */
  ttl?: string;
}

/** Metadata on the usage of the cached content. */
export interface CachedContentUsageMetadata {
  /** Total number of tokens that the cached content consumes. */
  totalTokenCount?: number;

  /** Number of text characters. */
  textCount?: number;

  /** Number of images. */
  imageCount?: number;

  /** Duration of video in seconds. */
  videoDurationSeconds?: number;

  /** Duration of audio in seconds. */
  audioDurationSeconds?: number;
}

/** Response with a list of CachedContents. */
export interface ListCachedContentsResponse {
  /** List of cached contents. */
  cachedContents?: CachedContent[];
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}
