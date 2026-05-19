import { FeaturesService } from './features.service';
export declare class FeaturesController {
    private featuresService;
    constructor(featuresService: FeaturesService);
    feature1(req: any): Promise<{
        message: string;
        unlockedFor: string | undefined;
    }>;
    feature2(req: any): Promise<{
        message: string;
        unlockedFor: string | undefined;
    }>;
    feature3(req: any): Promise<{
        message: string;
        unlockedFor: string | undefined;
    }>;
}
