export interface HttpResponse {
  statusCode: number;
  body: any;
  responseType: "json" | "jpg" | string;
}

export interface HttpRequest {
  body?: any;
  params?: any;
}
